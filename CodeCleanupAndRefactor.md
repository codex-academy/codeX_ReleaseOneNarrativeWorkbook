# Code cleanup and refactoring

You came a long way! You started off by processing a CSV file and displaying the data in a browser using a web server.  You created a data model using MySQL. Then you hooked the data model up to your web application to Create, Read, Update, and Delete data. Along the way you added a password and user roles. And don't forget the search support you added!

It's time now to stand back and review the code you wrote.

Where is most of your code? How do the different parts of the code relate to each other? You probably have a `server.js` or `index.js` file.  What modules did you import that contain code for products, sales, or purchases, for example? Do you have a monster `server.js` or `index.js` file that contains everything? **Take a quick look?**

## What is the prognosis?

Have you had a look now? How is it looking?

Any monolithic pieces of code (i.e. big pieces that do a lot of things)? Or, even worse, one big piece of code that does everything?

If that is the case the first thing to do would be to split up your code up into smaller parts. Split up your code into modules that handle specific domains like products, sales, and categories. Decouple your code into logical components. This makes makes system maintenance much easier, and your code easier to understand.

## Refactor

Refactoring is the process of making your codebase better without changing its behaviour. It improves the way your code is written and it improves the structure. Refactoring makes it easier for future you and others to maintain and extend your code.

**Go ahead refactor your code by:**

* Adding modules for Categories, Products, Sales, Purchases, and Suppliers
* Looking at your project web routes. Are they consistent? For example : `products/add`, `products/edit`, `products/update`, and `products/delete`. Whatever convention you are following, be consistent. Use lowercase for route names.
* Ensure all `express` `get` and `post` handlers are in modules and you have no inline handles.

This is bad:

```javascript
app.get('/products', function(req, res){
    // lots of code here
});
```

This is better:

```javascript
app.get('/products', products.showProducts);
```

## Next steps

The next thing is to check if your [code is testable](./RefactorToBeTestable.md).

Then look at Promises for [a better way to handle callbacks](./Promises.md).

## Refactor your database modules to use Promises

A simple wrapper around the mysql code like this will suffice:

```javascript
var QueryBuilder = function(connection){
    this.execute = function(sql, params){
        return new Promise(resolve, reject){
            connection.query(sql, params, function(){
                connection.query(sql, params, function(err, results){
                    if(err) return reject(err);
                    resolve(results);
                });
            });
        };
    }
}
```

How would you use this class?
How would you handle nested database queries now?
