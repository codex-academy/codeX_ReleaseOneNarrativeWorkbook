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

The code is decoupled from the database now. There is a new method on the http request object instance `req` giving access to the `productDataServices`. The front-end and the database concerns are now properly separated out.

To use this approach you need to install a module called `connection-provider` and configure it with your database details.

Install it like this: `npm install --save avermeulen/connection-provider`. This command adds [André's connection-provider](https://github.com/avermeulen/connection-provider) module to your project (by putting modules in your `node_modules` directory, and adding a line to your `package.json`).

Configure it using in your `server.js` as follows:

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
        //this name should match the name exposed via the services object from req.services
        productDataService : new ProductsDataService(connection)
        //add the other data services here
    }
};

app.use(connectionProvider(dbOptions, setupCallback));
```
