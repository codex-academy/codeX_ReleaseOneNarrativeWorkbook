# A better way of handling callbacks

Callbacks are an integral part of Node JS and you are using them on a daily basis. They can be a pain at times and can lead to an asynchronous mess. Callbacks within callbacks leads messy and complicated code.

Code looking like this is common:

```javascript
functionOne("param1", function(err, results){
    functionTwo("param2", function(err, results2){
        console.log(results);
        console.log(results2);
        functionThree("param3", function(results3){
            console.log("I am in the middle!");
        });
    })
})
```

In the code above we have three functions that needs to be called in sequence, hence they are called in the called back of the previous functions.

## Promises

Using Promises makes Callbacks easier to work with they are also make your composable, which means that different parts of the components can work together.

`A promise represents the eventual result of an asynchronous operation.`

So far we used callbacks send in as a parameter into the function. We basically tell the function that do something with the parameters I sent you. And when you are done return the results using the callback function I gave you. The callback returns an error if there was one and the results of the call.

To read a file looks like this:

```javascript
    var fs = require('fs');
    fs.readFile('try_this.md', 'utf-8',  function(err, content){
        if (err){
            console.log(err);
            return;
        }
        console.log(content);
    });
```

Using a promise you can change to above code into:

```javascript
var readFile = require('read-file');

readFile("try_this.md")
        .then(function(fileContent){
            console.log(fileContent);
        })
        .catch(function(err){
            console.log(err);
        });
```

This code is much easier to read! We are calling `readFile` with a file name, the eventual result being one of two things the content of the file or an error. There are still callbacks, but the code flow much better.

There are various different Promises modules we will be using [bluebird](https://github.com/petkaantonov/bluebird). You can install it from npm using `npm install bluebird`

> Promises are natively supported in the newest version of Node JS (version 4) \o/

Bluebird provides utility functions that makes our live much easier when working with asynchronous code. One such function is the `join`, it prevent nested callbacks. Reading multiple files using the join function looks like this :

```javascript
var readFile = require('read-file');
var Promise = require('bluebird');

Promise.join(readFile("try_this.md"),
             readFile("try_that.md"), function(thyThisContent, tryThatContent){
                console.log(tryThisContent);
                console.log(tryThatContent);
        });
```

## Let's make a Promise

Although bluebird can automatically create promises ([promisify](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification)) from functions that follows the Node JS callback convention we will focus on creating them manually. As we would like to use Promises with constructor functions, which doesn't support promisification.

To create the `read-file` module as a Promise looks like this:

```javascript
var Promise = require('bluebird');
var fs = require('fs');

module.exports = function(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, 'utf-8',  function(err, content){
            if (err) return reject(err);
            resolve(content);
        });
    });
};
```

See if you can get this code running locally! What is doing is to wrapping the callback in a Promise instance and call the `resolve` and `reject` callbacks from the `Promise` object.

Take a closer look at the [bluebird Promise](https://github.com/petkaantonov/bluebird) to get a better feel of what is possible!
