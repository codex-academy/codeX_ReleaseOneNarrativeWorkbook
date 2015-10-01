# A better way of handling callbacks

Callbacks are an integral part of Node JS and you are using them on a daily basis. They can be a pain at times and can lead to an asynchronous mess. Callbacks within callbacks leads messy and complicated code.

Here is how we read two files asynchronously and print their contents to the screen:

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

The code above have functions that needs to be called in sequence, hence the once functio are called in the callback of the previous function.

## Promises

Using [Promises](https://www.promisejs.org/) makes Callbacks easier to work with they are also make your code more composable.

`A promise represents the eventual result of an asynchronous operation.`

Callback functions are sent into a function as a parameter. We basically tell the function that do something with the parameters I sent you. And when you are done return the results using the callback function I gave you. The callback returns an error or the results of the call.

There are various Promises modules we will be using [bluebird](https://github.com/petkaantonov/bluebird). You can install it from npm using `npm install bluebird`

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

The code is using bluebird's promisification support, it can automatically create promises ([promisify](https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification)) from modules that follows the Node JS callback convention. But we will focus at creating them manually as well. As we would like to use Promises with constructor functions, which bluebird's promisification can't do.

Using a Promise you can change to above code into:

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

Bluebird provides lots of very usefull utility functions that makes our live much more pleasant, when working with asynchronous code. One such function is  `join`, it prevent nested callbacks.

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
Tell me that ain't cool!

## Make a Promise

Now get this code running locally!

Take a closer look at the [bluebird Promise](https://github.com/petkaantonov/bluebird) to get a better feel of what is possible!
