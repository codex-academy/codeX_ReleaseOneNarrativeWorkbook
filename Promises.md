# A better way of handling callbacks

Callbacks are an integral part of Node JS and you are using them on a daily basis. They can be a pain at times and can lead to code that is hard to read, especially when you have callbacks within callbacks.

Look at the code below that reads two files asynchronously and prints their contents to the screen:

```javascript
var fs = require('fs');
fs.readFile('try_this.md', 'utf-8',  function(err, tryThis){
    if (err){
        return console.log(err);
    }
    fs.readFile('try_that.md', 'utf-8',  function(err, tryThat){
        if (err){
            return console.log(err);
        }
        console.log(tryThis);
        console.log(tryThat);
    });
});
```

This is pretty standard Node code but it can soon become messy. Luckily there is an alternative.

## Promises

[Promises](https://www.promisejs.org/) makes callbacks easier to work with they are also make your code more [composable](http://stackoverflow.com/questions/2887013/what-does-composability-mean-in-context-of-functional-programming/2887024#2887024).

> A promise represents the eventual result of an asynchronous operation.

There are various Promises modules we will be using. Let's look at [bluebird](https://github.com/petkaantonov/bluebird) first. You can install it from npm using `npm install bluebird`

> Promises are natively supported in the newest version of Node JS (version 4) \o/

Here's an example of reading files using a callback:

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

Here is the same code using a Promise:

```javascript
var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
fs.readFileAsync('try_this.md', 'utf-8')
    .then(function(err, content){
        console.log(content);
    })
    .catch(function(err){
        console.log(err);
    });
```

This code is much easier to read! We are calling `readFile` with a file name, the eventual result being the content of the file or an error. There are still callbacks, but the code flow much better.

The code is using bluebird's promisification support. It can automatically create [promises from modules](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification) that follow the Node JS callback convention. We will also look at creating them manually, as we need Promises with constructor functions, which bluebird's promisification doesn't support.

Using a Promise we can create a readFile constructor/factory function that looks like this:

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

To create the `read-file` module using a Promise looks like this:

```javascript
var fs = require('fs');
var Promise = require('bluebird');

module.exports = function(fileName){
    return new Promise(function(resolve, reject){
        fs.readFile(fileName, 'utf-8',  function(err, content){
            if (err) return reject(err);
            resolve(content);
        });
    });
};
```

## Utility functions

Bluebird provides lots of very useful utility functions that makes our live much more pleasant when working with asynchronous code. One such function is `join`: it prevents nested callbacks.

Reading multiple files using the join function looks like this :

```javascript
var readFile = require('read-file');
var Promise = require('bluebird');

Promise.join(readFile("try_this.md"),
    readFile("try_that.md"),
    function(thyThisContent, tryThatContent){
        console.log(tryThisContent);
        console.log(tryThatContent);
    });
```

Tell me that ain't cool! :D

## Make a Promise

Now get this code running locally.

Take a closer look at the [bluebird Promise](https://github.com/petkaantonov/bluebird) to get a better feel of what is possible!
