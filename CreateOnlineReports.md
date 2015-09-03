#Create online reports

## Background

Now let's display all the data you mined from the Nelissa's CSV File online. For that you will need a web server, a template engine, and data. You already have the data. As a web server we will be using Express JS and as a template engine Handlebars JS. You will install all these dependencies using ```npm```

There are loads of alternatives to all the above in the Node JS ecosystem, but knowing how the selected toolset works will give you a good baseline to explore alternatives from.

You should focus on:
* Express JS - http://expressjs.com/
* Handlebars JS - http://handlebarsjs.com/
* Handlebars JS & Express integration layer - https://www.npmjs.com/package/express-handlebars

## Concepts

Some concepts you might bump into while doing this work.

* JSON
  * Javascript Object Notation
  * Data Interchange - alternative to XML
  * Use require statement to import data
* Templates
  * HTML & CSS
  * Layout
  * http://handlebarsjs.com/
* Web Server
  * Express JS
    * Create routes
    * Combine data and template
    * Renders dynamic content using a view engine

## Get going with Express JS

Here are some basic instructions on how to get going with Express JS.

### Install Express JS
  * create a new folder in your projects folder called ```spaza-app```
  * change into this folder using ```cd spaza-app```
  * create a a ```package.json``` file using ```npm init```
  * install Express JS and store it in the dependencies list in the package.json ```npm install --save express```

 More details here: http://expressjs.com/starter/installing.html

### Getting a basic Express instance to run

Create a file called ```server.js``` and copy the text below into it:

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

   * Start the server by typing ```node server.js``` and pressing enter in the console.
   * In the web browser navigates to http://localhost:3000/
   * Stop the server in the console by pressing Ctrl-C in the console a few times
   * Now navigate to http://localhost:3000/ again. What happens?
   * Start the server and try the above again.
   * Try to navigate to ```http://localhost:3000/hello``` - what happens? How can we fix that?
   * Try this:
    * Stop the web server
    * Add a new route for '/hello' that renders 'Hello codeX!' to the screen
    * Start the server
    * Now try to navigate to ```http://localhost:3000/hello``` What happened?

## Easy server restarts

One thing you will find is that you will need to restart Express JS everytine you changed a source file to get around that, install ```nodemon``` This will restart Express JS whenever a source file changes.

It's here : https://www.npmjs.com/package/nodemon - install it using npm

Use it like this:

```nodemon server.js```

Go ahead and setup nodemon.

## Rendering static files

So far we created some routes, but added no style as we haven't had any full web pages. We can change our web server configuration to allow it to display static files.

You should have a basic Express JS setup in place which can be used as a baseline to get some basic reports up and running.

To see more details about this. Have a look here: http://expressjs.com/starter/static-files.html

Let's go ahead:
* and add a public folder in your spaza-app folder
* change your server.js file to render static files from the public folder using this, ```app.use(express.static('public'));```
* in the public folder create a file called index.html and add some content to it
* Navigate to the file using http://localhost:3000/index.html
* If you are using nodemon no server restart would be required. If not, restart your server (please start using nodemon!).
* Going forward you will be able to use the public folder to store and reference css files and images from.

##Templating

We will be using ```handlebars``` as the template engine, it combines data with templates to render information.

A typical handlebars template look likes this

```
<div class="entry">
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{/if}}
</div>
```

Combining the above with data like this:

```javascript
var user = {
 author : true,
 firstName : "Jo",
 lastName : "Blogss"
};
```

results in a html enriched with some data.

Handlebars JS is built on top of Mustache templating engine and extends it. Mustache templating aims to be logic-less templating, but that aim makes it hard to use at times.

See some more information on how the templates works: https://mustache.github.io/mustache.5.html

> See some background information on the difference between Handlebars and Mustache : http://stackoverflow.com/questions/10555820/what-are-the-differences-between-mustache-js-and-handlebars-js

Handlebars comes with a set of built in helpers that makes it easy for one to process data and convert it into a layout. It support things like if statements and loops.

http://handlebarsjs.com/builtin_helpers.html

## Combining templates & data

As we need to display the data in the web browser we use the templates, which is how we would like the data to be displayed, with what needs to be displayed, which is the data.

It goes like this:

```template + data = web page```

So we somehow need to combine templates and data in Express JS. Luckily there is already a Node module that combines Express JS and Handlebars.

Look at this : https://www.npmjs.com/package/express-handlebars

Integrate handlebars templating into your spaza-app Express application.

## Display data from Nelisa's CSV

You should now know enough to display online reports for Nelisa.


##Useful links:

* Loading JSON files using require - https://nodejs.org/api/modules.html#modules_file_modules
* http://expressjs.com/
* http://handlebarsjs.com/
* https://mustache.github.io/

## Layout & CSS frameworks

How do you make your Spaza Shop reports looking nice on laptops, tablets and phones? Responsive Web Design is the answer. If a web site is responsive it will respond correctly to the device that it is displayed on. Responsive web design is a whole field in it's own right. But luckily there are some frameworks you can build on. These frameworks are:

http://getbootstrap.com/

http://foundation.zurb.com/

http://getskeleton.com/

Comparing CSS frameworks: http://responsive.vermilion.com/compare.php
