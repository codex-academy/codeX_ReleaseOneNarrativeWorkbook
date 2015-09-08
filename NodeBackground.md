#Node Background

This is a high level overview of concepts that you will need to be familiar with when you are using Node JS. This focuses on things that are different from the JavaScript you used so far. Node JS is JavaScript outside the browser and you can use your JavaScript knowledge to good use to do some interesting things on the backend.

Node JS introduce things such as :

* Asynchronous code that uses callbacks
* An API of its own - file access for example
* Modules to share code
* npm to install/share 3rd party modules

Each one will be briefly discussed below.

## Asynchronous

What does Asynchronous mean, you ask?

```
Node does I/O in a way that is asynchronous which lets it handle lots of different things
simultaneously. For example, if you go down to a fast food joint and order a cheeseburger
they will immediately take your order and then make you wait around until the cheeseburger
is ready. In the meantime they can take other orders and start cooking cheeseburgers
for other people. Imagine if you had to wait at the register for your cheeseburger,
blocking all other people in line from ordering while they cooked your burger!
This is called blocking I/O because all I/O (cooking cheeseburgers) happens one at a time.
Node, on the other hand, is non-blocking, which means it can cook many cheeseburgers at once.
```

## Callbacks

What is a callback? A callback is an alternative way to return results to the calling process. Instead of returning results to the calling process using a return statement, a callback function is provided that the function that is called use to communicate back to the calling function.

As explained above in the 'Cheeseburger' example - callbacks are a way to prevent functions from blocking (waiting for) each other. It allows one to easily write code that can handle multiple I/O (Input Output) processes efficiently. Callbacks are also used heavily in Client Side JavaScript especially to do background Async calls to the server, that doesn't block the front-end browser code (this is called Ajax).

Here is a basic example that illustrates callbacks:

```javascript

var callback = function(err, value){
	console.log("here you go after 2 seconds : " + value);
}

//lets simulate a task that takes 2 seconds to complete
var functionWithCallback = function(param, cb){
	setTimeout(function(){
		cb(null, "OK!");
		console.log('now we are done');
	}, 2000);
}

functionWithCallback("some param", callback);
//we can do other things now while the task
console.log("done!");

```

If you look at this code what do you expect the output to the console to be?
In what order are the strings logged to the console?

It might surprise you that the output is:

```
done!
here you go after 2 seconds : OK!
now we are done
```

Why is ```done!``` printed out to the console first?

This is due to the fact that the ```functionWithCallback``` function takes 2 seconds to complete and that the code is non-blocking, but uses a callback function to send a reply back to the calling code when it is done. In real life callbacks will be used for things such as accessing a database, files, or reading some data from some where in the 'cloud' - whichever process might take a while to complete.

There are various modules & libraries available to assist one with the syncronization of callbacks, as this gets complicated at times.

Find a more detailed discussion on callbacks here: https://github.com/maxogden/art-of-node#callbacks

##Node API

Over and above the normal capabilities of JavaScript, Node JS can do loads more things like:

* reading and creating files on disk
* making HTTP calls
* hosting a HTTP/TCP server

If you are curious about what is possible have a look here: http://nodejs.org/api/

But don't get bogged down in the details too much at this stage.

##modules

To use JavaScript code in the Web browser is easy: one just needs to reference the code in the right order using using ```script``` tags.

In Node things are different - it uses the CommonJS module pattern, which handles dependencies between different pieces of your JavaScript code.

You can create a module that is like an Object literal like this:

```
exports.sayHello = function(){

}
exports.sayBye = function(){

}
```

If the above is in a file called greetings.js

You can use it from greetings_test.js in the same folder like this.

```
var greeter = require('./greetings');

greeter.sayHello();
```

You can create a module that is more like a constructor function like this:

```javascript

module.exports = function(name){
	this.name = "Andre";

	this.sayHello = function(){
		console.log('Hi, I am ' + name);
	}

	this.sayBye = function(){
		console.log('Bye!');
	}

}
```
If the above is in a file called greeter2.js.

You can use it from greetings_test2.js in the same folder, like this:

```

var Greeter = require('./greeter2');

var greeter = new Greeter("Andy");

greeter.sayHello();

```

When you create your own modules you always need to use a relative path starting with a ```./``` - globally installed modules don't need that.

> Some details can be found here:
>  http://nodejs.org/api/modules.html

One of the major things about Node is that there are loads of third party libraries out there that you can reuse. These libraries allow you to access databases, create APIs or even control a Robot.

The central library of libraries is called, http://npmjs.org, you use the ```npm``` command to install libraries from there.

A few useful npm commands to look into are:

  * ```npm install <library name>```
  * ```npm install -g <library name>```
  * ```npm init package.json```
  * ```install --save```
