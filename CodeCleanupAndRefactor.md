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
    * Ensure all express get and post handlers are in modules and you have no inline handles

    For example code like this is bad:
    ```javascript
    app.get('/products', function(req, res){
        // lots of code here
    });`

    It should be like this:

    ```javascript
    app.get('/products', moduleName.showProducts);
    ```


## Make it testable

The next thing we need to do is to make sure that our code is testable. To do that we would need to decouple your code a bit more. Decoupling means that code the different components of your code is seperated out properly. Let's look at the example below:

```javascript
exports.getProducts = function(req, res, next){
        req.getConnection(function(err, connection){
            if (err) return next();
            connection.query('select productName from products where productId = ?', 97, function(err, products){
                res.render('products', {products : products});
            });
        });
};
```

What is this code doing? How many reasons does this function have to change? How can we write a unit test to test it?


Make it testable
    * Mocha

Test database using Travis

Introduce Promises
    * Section on testing callbacks within callbacks
    * Multiple queries
