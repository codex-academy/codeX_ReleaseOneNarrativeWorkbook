# Testable code

You need to do is to make sure that our code is tested. You cheated actually, but your focus was on learning how to get things done. How much of your code are actually tested? No much?!

Let's fix that! You will need to decouple your code to make it testable.

Decoupled code have different logical components that is seperated out from each other.

Let's look at the code below:

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

It's doing alot! And it is hard to test! This code will change for the database and if the front end changes. So it's concerned with both the back and front end.

## Refactor it to be testable

To make the code more testable we will need decouple the database code from the front end code.

Which parts are which, are really hard to determine at this stage!

Let's start by creating testable database code to check if the query returns the right data.

To do that we decouple the database code by creating a new module in a file `products-data-service.js`:

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

Now we have a testable products database module.

You can test it using [mocha](https://mochajs.org/) like his:

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
Our initial piece of code can now be re-written as follows:

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

The code have less reason to change now, database related changes shouldn't affect it, only screen related changes.

**Now go ahead and refactor your Products module** and write some mocha tests for it.

# Test database services with Travis

Now that you have Mocha tests for your database code, setup a Travis instance for your project. You will need  database scripts that can create and populate your database every time Travis runs. This is a good practice and will ensure your database script and your database is syncronized.

Look at [example project](https://github.com/avermeulen/TravisWithDatabase) that use Travis with a database. Note the `.travis.yml` especially.


## Better database connections

The code is still coupled to the database due to the `req.getConnection` function call. It handles the database connection using the `express-myconnection` module with central database configuration in your `server.js` file.

By using an alternative `connection-provider` module one can change this code to:

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

The code is decoupled from the database noew. There is a new method on the http request object instance `req` giving access to the productDataServices. The front end and the database concerns are now properly seperated out.

To use this approach you need to install a module called `connection-provider` and configure it with your database details.

Install it it like this: `npm install --save avermeulen/connection-provider`

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
