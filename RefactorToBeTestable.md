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
        if (err) return cb(err, null);
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
        if (err) return cb(err, null);
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


# Test database services with Travis

As you now have some Mocha tests for your database code setup a Travis instance for your project. You will need some dtabase scripts that can create and populate your database every time Travis runs, but this is a good way of ensuring your database script and your database are syncronized.

Look at [example project](https://github.com/avermeulen/TravisWithDatabase) that use Travis with a database. Take a look at the `.travis.yml` especially.


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
            })
        .catch(err){
            res.render('product', {error : err});
        };
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

// create object instances that have a database connection
var setupCallback = function(connection){
    return {
        //this name match name exposed via the services object from req.services
        productDataService : new ProductsDataService(connection)
        //add the other data services here
    }
};

app.use(connectionProvider(dbOptions, setupCallback));
```
