# Testable code

You need to make sure that your code is tested. Your focus was on learning how to get things done, so we cheated a little. How much of your code are actually tested? Not much? Let's fix that!

You will need to decouple your code to make it testable. Decoupled code has different logical components that are separated out from each other.

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

It's doing a lot, and it is hard to test! This code looks up things in the database, and shows something on the front-end depending on what the result is. It's concerned with both the back and front-end.

## Refactor it to be testable

To make the code more testable we will need decouple the database code from the front-end code.

Which parts are which is really hard to determine at this stage!

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
            // to do: do we want to return null!
            cb(null, null);
        });
    }
}
```

Now we have a testable products database module.

You can test it using [mocha](https://mochajs.org/) like this:

```javascript
var ProductsDataService = require('products-data-service');

describe('test the ProductsDataService', function(){
    // Uncomment the line below and create a connection to your mysql database
    // var connection =

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

The code has less reason to change now. Database related changes shouldn't affect it, only screen related changes.

**Now go ahead and refactor your Products module** and write some Mocha tests for it.

## Test database services with Travis

Now that you have Mocha tests for your database code, setup a Travis instance for your project. You will need  database scripts that can create and populate your database every time Travis runs. This is a good practice and will ensure your database script and your database is synchronised.

Look at [example project](https://github.com/codex-academy/TravisWithDatabase) that use Travis with a database. Note the `.travis.yml` especially.

## Refactor the database connection

Now let's look at making [better database connections](better-database-connections.md).
