# Code cleanup and refactoring

You did a lot so far you started of by processing a CSV file, displaying the data on a browser using a web server. Then you created a data model in MySQL which you then hooked up to your web application to create, delete, update and read data.

It's time now to stand back and review what we did so far. Where are most of your code? How does the different parts of the code relate to each other? I expect that you have a server.js or index.js file and some module you import that contains code for either products, sales or purchases for example. Maybe you have a monster server.js or index.js file that contains everything. Take a quick look?

## What is the prognosis?

Ok you had a look now how is it looking? Any monolithic pieces of code ie. a big piece of code that do a lot of things? Or even worse a big piece of code that does everything? If that is the case the first thing to do would be to start splitting your code up into smaller parts. Use modules to split your code up. Split your code up in modules that handles product, sales, categories etc specifics. You are in effect starting to decouple the different parts of your system into smaller part that are much easier to understand. This also makes maintenance much easier.

## Refactor

The process of making your code better and more maintainable without changing what it is doing is called refactoring. So nothing will change in your front end, but they way your code is being written and structured will change a lot. After you refactored your code it should be easier to understand and maintain. The whole idea of code refactoring is to make it easier for the future you and other people that will need to look and maintain your code.

Go ahead refactor your code by:
* Adding modules for Categories, Products, Sales, Purchases and Suppliers
* Look at you project web routes are they consistent? For example : `products/add`, `products/edit` `products/update` and `products/delete` - whatever convention you are following be consistent. And use lowercase for route names.
* Ensure all express get and post handlers are in modules and you have no inline handles For example code like this is bad:

    ```javascript
    app.get('/products', function(req, res){
        // lots of code here
    });```

    It should be like this:

    ```javascript
    app.get('/products', products.showProducts);
    ```


## Make it testable

The next thing we need to do is to make sure that our code is testable. To do that we would need to decouple your code a bit more. Decoupling means that code the different components of your code is seperated out properly. Let's look at the example below:

```javascript
exports.getProduct = function(req, res, next){
        req.getConnection(function(err, connection){
            if (err) return next();
            var productId = req.params.productId;
            connection.query('select productName from products where productId = ?', productId, function(err, products){
                if (products && products.length > 0){
                    res.render('product', {products : product});
                }
                else{
                    res.render('product', {error : 'Product not found.'})
                }
            });
        });
};
```

Ask yourself:

* What is this code doing?
* How many reasons does this function have to change?
* How can I write a unit test to test it?

It's doing alot! And it is hard to test! And this code will change if one needs to change the database query and if the fromt end needs to change.

Let's look try and make that code simpler and make it more testable.

## Refactor it to be testable

To make the code more testable we will need decouple the database code from the the front end code. Which parts are whic you ask? That is really hard to determine at this stage I know! Say we would like to test the database code to check if the query returns the right data. Let's decouple the database code.

Let's create the code below in a file called `products-data-service.js`:

```javascript
module.exports = function(connection){
    this.getProduct = function(productId, cb){
        connection.query('select productName from products where productId = ?', productId, function(err, products){
            if (products && products.length > 0){
                return cb(null, products[0]);
            }
            // to do do we want to return null!!
            cb(null, null);
        });
    }
}    
```

Now we have a module that only does one thing! It takes care of getting products from the database. We can later add more functionality to it to store products maybe or do other Products database related things. But the fact remain that this class is focussed on Product related database matters. This module is also easily testable now.

You can test it using (mocha)[] like his:

```javascript

var ProductsDataService = require('products-data-service');

describe('test the ProductsDataService', function(){

    var connection = //create connection to your mysql database

    it('getProduct should return a specific product', function(done){
        var productsDataService = new ProductsDataService(connection);
        productsDataService.getProduct(9, function(err, product) {
            assert.equal('milk', product.name);
        });
    });
});
```
Our initial piece of code can now be re-written as well:

```javascript
var ProductsDataService = require('products-data-service');
exports.getProduct = function(req, res, next){
    req.getConnection(function(err, connection){
        var productId = req.params.productId;
        //we need a better way to do this
        var productsDataService = new ProductsDataService(connection);
        productsDataService.getProduct(productId, function(err, product) {
            if (products && products.length > 0){
                res.render('product', {products : product});
            }
            else{
                res.render('product', {error : 'Product not found.'})
            }
        });
    });
};
```

Things are looking better already. The code above have less reasons to change. Any database related changes shouldn't affect the code, only screen related changes. So we are starting to seperate concerns better.

**Now go ahead and refactor your Products module** and write some mocha tests for it.

## Better database connections

The code above is still coupled to the database use due to the `req.getConnection` function call. We need this call we need to handle the database connection using the `express-myconnection` module from a central configuration in our `server.js` file.

What if we could write the getProduct function like this:

```javascript
exports.getProduct = function(req, res, next){
    req.getServices()
        .then(function(services){
        var productId = req.params.productId;
        //we need a better way to do this
        var productsDataService = services.productDataService;
        productsDataService.getProduct(productId, function(err, product) {
            if (products && products.length > 0){
                res.render('product', {products : product});
            }
            else{
                res.render('product', {error : 'Product not found.'})
            }
        });
    });
};
```

Now the code is totally decoupled from the database. There is a new method on the http request object instance `req` which gives us access to the productDataServices instance. Now the front end code and the database concerns is totally seperated from each other.

To setup the code above you need to install a module called `connection-provider` and configure it with your database details.

Install it it using: `npm install --save avermeulen/connection-provider`

Configure it using in your server.js as follows:

```javascript
var connectionProvider = require('connection-provider');
var express = require('express');
var ProductsDataService = require('products-data-service');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'user_name',
      password: 'password',
      port: 3306,
      database: 'db_name'
};

// create object instances that have a databae connection
var setupCallback = function(connection){
    return {
        //this name match name exposed via the services object from req.services
        productDataService : new ProductsDataService(connection)
    }
};

app.use(connectionProvider(dbOptions, setupCallback));
```

# Test database using Travis



Introduce Promises
    * Section on testing callbacks within callbacks
    * Multiple queries
