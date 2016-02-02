## Get going with Express JS

Here are some basic instructions on how to get going with Express JS.

### Install Express JS

* create a new folder in your projects folder called `spaza-app`
* change into this folder using `cd spaza-app`
* create a a `package.json` file using `npm init`
* install Express JS and store it in the dependencies list in the package.json `npm install --save express`

 More details at [Installing Express JS](http://expressjs.com/starter/installing.html).

### Getting a basic Express instance to run

> An instance is a copy of a server.

Create a file called `server.js` and copy the text below into it:

```javascript
var express = require('express');
var app = express();

// create a route
app.get('/', function (req, res) {
 res.send('Hello World!');
});

//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);

});
```
**Now try this:**

* Start the server by typing `node server.js` and pressing enter in the console.
* In the web browser navigates to http://localhost:3000/
* Stop the server in the console by pressing Ctrl-C in the console a few times
* Now navigate to http://localhost:3000/ again. What happens?
* Start the server and try the above again.
* Try to navigate to `http://localhost:3000/hello` - what happens? How can we fix that?
* Try this:
    * Stop the web server
    * Add a new route for '/hello' that renders 'Hello codeX!' to the screen
    * Start the server
    * Now try to navigate to `http://localhost:3000/hello` What happened?

## Easy server restarts

One thing you will find is that you will need to restart Express JS everytine you changed a source file to get around that, install [nodemon](https://www.npmjs.com/package/nodemon). This will restart Express JS whenever a source file changes.

It's here : https://www.npmjs.com/package/nodemon - install it using npm

Use it like this:

```
nodemon server.js
```

Go ahead and setup nodemon.
