### Middleware

Express JS give us access to a concept called middleware where by we can extend the way that it handles HTTP requests from end users.

To create a new middleware component do this in your express configuration:

```javascript
app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});
```

The above middleware component will not do much it will only log a message to the console.

But we can use it to implement a simple Authentication check if we use it in combination with the `express-session` module.

We want the middleware to do the following:

* Check if the user is Authenticated
* If the user is not Authenticated, redirect the user to the login route

The login routes should:

* Capture the user's credentials;
* Check the user's credentials;
* Store the appropriate entries in the HTTP Session.

### Route specific middleware

The example above added a global middleware instance, that will fire for all HTTP requests. Another way is to add route specific middleware.

```javascript
var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect them to the login page
  res.redirect('login');
};

app.get('/users', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('users', userData)
});
```
