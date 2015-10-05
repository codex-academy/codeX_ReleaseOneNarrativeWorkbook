# Refactor your database modules to use Promises

You know everything now to refactor your database modules to use `Promises`. Replace any nested database callbacks with `join` function from `bluebird`.

A simple wrapper around the mysql code like this will serve you well:

```javascript
var QueryBuilder = function(connection){
    this.execute = function(sql, params){
        return new Promise(resolve, reject){
            connection.query(sql, params, function(err, results){
                if(err) return reject(err);
                resolve(results);
            });
        };
    }
}
```

> Think about
* How would you use this wrapper?
* How would you handle nested database queries using bluebird's `join`?

You will need to instantiate one instance of the `QueryBuilder` when constructing instance of you database modules.
