# Code cleanup and refactoring

You came a long way , you started of by processing a CSV file, displaying the data on a browser using a web server.  You created a data model using MySQL. Then you hooked the data model up to your web application to create, delete, update and read data. Along the way you added a password and user roles. And not to forget the search support you added.

It's time now to stand back and review the code you wrote.

Where are most of your code? How does the different parts of the code relate to each other? I guess you have a server.js or index.js file?  What modules you import that contains code for  products, sales or purchases for example. Do you have a monster server.js or index.js file that contains everything. **Take a quick look?**

## What is the prognosis?

Ok you had a look now? How is it looking?

Any monolithic pieces of code ie. big pieces of code that do a lot of things? Or even worse a big piece of code that does everything?

If that is the case the first thing to do would be to split your up code up into smaller parts. Split your code up in modules that handles specific domain like products, sales and categories. Decouple your code into logic components that is easy to understand. This makes system maintenance much easier.

## Refactor

Refactoring is the process of making your codebase better without changing it is behaviour. It improves the way your codes is written and it improves the structure. Refactoring makes it easier for the future you, and others to maintain and extend your code.

**Go ahead refactor your code by:**

* Adding modules for Categories, Products, Sales, Purchases and Suppliers
* Look at you project web routes are they consistent? For example : `products/add`, `products/edit` `products/update` and `products/delete` - whatever convention you are following be consistent. And use lowercase for route names.
* Ensure all express get and post handlers are in modules and you have no inline handles.

    This is bad:

    ```javascript
    app.get('/products', function(req, res){
        // lots of code here
    });```

    This is good:

    ```javascript
    app.get('/products', products.showProducts);
    ```

## Next steps

The next thing is to check if your [code is testable](./RefactorToBeTestable.md)

Then look at Promises for [a better way to handle callbacks](./Promises.md)

## Refactor your database modules to use Promises

A simple wrapper around the Mysql code like this will suffice:

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

How would you use the class?
How would you handle nested database queries now?
