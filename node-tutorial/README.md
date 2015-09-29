# Node tutorial

A quick introduction to Node JS.

This will introduce you to using Javascript on the command line using Node JS.

## Testing what've done

There are some pre-written tests that will track your progress through this tutorial. To test that you have done the right thing you need to have the `mocha` module installed.

Install it by typing this into a terminal window:

```
sudo npm install -g mocha
```

The `-g` is for global package. That means you will be able to run mocha from the command line, from any directory.

You now need to:

* fork the [codeX_ReleaseOneNarrativeWorkbook](https://github.com/codex-academy/codeX_ReleaseOneNarrativeWorkbook) repository
* Now clone a copy into your local project folder
* open a new terminal window and change into the ```node-tutorial``` folder
* run mocha in that folder - type ```mocha``` and press enter - you should a message saying ```0 passing (1ms)```
* you should get messages about some failing tests
* all the work below should be done in the ```node-tutorial``` folder.

You can use the command below to see which tests are passing and which not:

```
mocha --reporter spec
```

As you work your way through the tasks run the `mocha` command after each test to be sure that your implementation is successful. As you work your way through the tutorial more and more of the tests should pass.

## Hello terminal

Create a file called `hello.js` in the node-terminal folder, in the script write 'hello world!' to the console.

You can run the program from the command line using: `nodejs hello.js`

Run `mocha` from the command line. At least one test should pass.

## Filter some numbers

Change the program that is in the filter-numbers.js file to only print the even numbers in the list to the console. You are not allowed to change the console.log statement.

Run the program from the command line using: `nodejs filter-numbers.js`

Run `mocha` from the command line. At least two tests should pass.

## Print users

Follow the instructions inside the users.js file

Run the program from the command line using: `nodejs users.js`

Run `mocha` from the command line. At least three tests should pass.

You can use `mocha --reporter spec` to see details on which tests are passing and which not - you might need to scroll up.

## Modules

So far all the NodeJS programs your wrote were little islands, the only way they communicated with the end user was through the console. And the only way we were able to test them was using some trickery to track what was logged to the console.

For sharing Javascript files in the browser one uses the `script` tag, but it is also tricky as these script references needs to be loaded in the right order, etc.

NodeJS has a more sophisticated module system, that is based on CommonJS. Not only can you create your own modules, but NodeJS also has it own built in modules that you can use to access files on disk for example.

To create a module that exports two methods called `high` and `low` you need do the following:

```javascript
exports.high = function(){
  return "high";
};

exports.low = function(){
 return "low";
}
```

Save the above code in a file called `my_module.js`, then create a new file, let's say called `test_modules.js`. You can use it as a module like this:

```javascript
// note the ./ in front of the module name
var low_or_high = require('./my_module');

console.log(low_or_high.low());
console.log(low_or_high.high());
```

If you run `test_modules.js` using `nodejs test_modules.js` then you should see:


```
low
high
```

printed to the screen.

Run `mocha` from the command line. The 'Let's use modules' test should pass.

Why use modules you ask? You use modules to break your program down into more manageable parts, encouraging decoupling of code. Or to break it into logical components that each focus on a specific task. It also makes it easier for one to test each component. Testable code is decoupled code that is properly componentized by using modules.

## More modules:

One can also create modules that export a whole new constructor function of its own. And it can take in parameters at construction time.

It looks like this:

```javascript
module.exports = function(descMap){

  this.high = function(){
    return descMap['high'];
  }

  this.low = function(){
   return descMap['low'];
  }
}
```

Save this code in a file called `another_module.js`

Create another file called `another_module_test.js` and use this module in there:

```javascript
var AnotherModule = require('./another_module');

var anotherModule = new AnotherModule({low : "very low", high : "very high"});

console.log(anotherModule.high());
console.log(anotherModule.low());

```

Running this should print:

```
very low
very high
```

To the screen

If you run `mocha` the 'Constructor module' test should pass.

Objects in Javascript has various useful methods that makes it easy to do various tasks: [Useful functions built into Javascript](useful-functions-built-into-javascript.md).

Once you've read about those, let's [use your newly found knowledge about modules](lets-get-modular.md).
