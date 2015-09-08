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

## Useful functions built into Javascript

Objects in Javascript have various useful methods that make it easy to do various tasks. We will look at a few useful methods of the String and Array objects just to show you what is possible. Be sure to look into what other methods are supported by the String and Array objects as well as the other built-in objects in Javascript - this will prevent you from doing unnecessary work.

### String

A string object in Javascript has a lot of methods that you can use.

To see what those are: [Standard built-on objects > String, on Mozilla Developer Network]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

One I would like to highlight is:

`split` - the split function. This takes a string and splits it into different parts using a delimiter.

Say for example you have a sentence and you would like to find all the words in the sentence.

```javascript
var sentence = "One day I went to the aquarium";

//split the sentence into a list of words
var words = sentence.split(' ');
console.log(words);

//will print to the console
//["One", "day", "I", "went", "to", "the", "aquarium"]

```

One useful trick is that you can split on newline characters by using the `\n` character. You can use this approach to split a file that contains newline characters into a list of strings. One string for each line in the file. Now you can go even further by splitting each line into separate fields. After this you should be able access all the data in the text file quite easily.

#### A useful recipe to remember:

* read a text file from disk
* split the file into an Array of string using the new lines character (`\n`) to get each line in the file
* split each line using a delimiter (either a space ' ' or comma ',' for example) to get all the fields in the line.

### Arrays

So what methods does an Array have?

Ok, go and google this quickly : `array javascript functions mdn`

> **Top tip** Whenever you search for javascript specific syntax, add the term 'mdn' to your search criteria.
This way you are bound to get a Javascript reference from 'The Mozilla Developer Network' (mdn) - which is an authority on Javascript syntax.

Using the search above your first hit should be: [Standard built-on objects > Array, on Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

We will focus on three functions of the Array object:

* forEach
* filter
* map

#### forEach

`forEach` is any easy way to loop through all the entries in a list

To display all the words in a list you can do this:

```javascript
var words = ["One", "day", "I", "went", "to", "the", "aquarium"];

words.forEach(function(word){
  console.log(word)
});

// this will write to the console

/**
"One"
"day"
"I"
"went"
"to"
"the"
"aquarium"
*/
```

#### filter

`filter` is a handy way to find data in an Array

To find all the words in a sentence shorter or equal to 3 do this:

```javascript
var words = ["One", "day", "I", "went", "to", "the", "aquarium"];

var shortWords = words.filter(function(word){
  return word.length <=3;
});

console.log(shortWords);

//this will print
//["One", "day", "I", "to", "the"]

```
#### map

`map` is an easy way to convert/change all the values in an Array:

To convert all the entries in a list to uppercase:

```javascript
var words = ["One", "day", "I", "went", "to", "the", "aquarium"];

var uppercaseWords = words.map(function(word){
  return word.toUpperCase();
});

console.log(uppercaseWords);

//this will print
//["ONE", "DAY", "I", "WENT", "TO", "THE", "AQUARIUM"]
```

## Let's get modular

Now let's use your newly found knowledge about modules.

You will now create a new module and also use some of NodeJS's built in modules. The module should be able to return a list of all the rows in all the files in a specified folder. Your module should be able to do that Synchronously and Asynchronously.

So your module should:

* find all the files in a folder
* then read each file in the folder
* find each row in each file
* then append each row to a list
* return the list that contains all the lines off all the files.

For example:

* if there are 3 files in the folder
* and each file has 3 rows
* your modules should return a list containing the 9 rows in each file

The built in module you should use is called 'fs' - 'fs' stands for File System. The `fs` built in module is handling all things related to accessing files from Node JS.

**You should use these 2 function calls from the fs module in your module:**

To get files in the folder: [readdirSync](http://nodejs.org/api/fs.html#fs_fs_readdirsync_path)
* To get the data in the files: [readFileSync](http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options)

> You will need to pass in the encoding of `utf8` as an option parameter to `readFileSync` otherwise a buffer will be returned instead of the string value.

You can read more about the fs module as a whole in [the Node API documentation]( http://nodejs.org/api/fs.html).

The module should be in a file called:

* read-folder.js
* expose 2 methods with parameters:
    * ```linesInFiles``` which takes folderName as a parameter and returns an Array
    * ```linesInFilesAsync``` which takes two parameters ```folderName and callback``` - the callback should return 2 parameters ```err``` & ```files```. Calling it should look like this:

        ```javascript
        linesInFilesAsync('/dir/name', function(err, files){
        });  
        ```
* use this folder as input: `./files/week1`

##Product list

Create a module that can read a product file and do two things:

* return a list of all the products in the file
* return the total number of items sold for each product

The module should:

* be called `products.js`
* have two ***Asynchronous*** methods:
  * `productNames` - returns a list of products
  * `productsSold` - returns a map of how many of each product is sold - mapping productName to quantity sold.
* use the `./files/products.csv` file to test

**Once all the tests are passing you are done!**
