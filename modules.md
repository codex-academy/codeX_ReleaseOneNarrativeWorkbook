## Modules

To use JavaScript code in the Web browser is easy: one just needs to reference the code in the right order using using `script` tags.

In Node things are different - it uses the [CommonJS](http://www.commonjs.org/) module pattern, which handles dependencies between different pieces of your JavaScript code.

You can create a module that is like an Object literal like this:

```javascript
exports.sayHello = function(){

}

exports.sayBye = function(){

}
```

If the above is in a file called `greetings.js`

You can use it from `greetings_test.js` in the same folder like this.

```javascript
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

If the above is in a file called `greeter2.js`.

You can use it from `greetings_test2.js` in the same folder, like this:

```javascript
var Greeter = require('./greeter2');

var greeter = new Greeter("Andy");

greeter.sayHello();

```

When you create your own modules you always need to use a relative path starting with a `./` - globally installed modules don't need that.

> Some details can be found at [Node API: modules](http://nodejs.org/api/modules.html)

One of the major things about Node is that there are loads of third party libraries out there that you can reuse. These libraries allow you to access databases, create APIs or even control a Robot.

The central library of libraries is called [npm](http://npmjs.org). You can use the `npm` command to install libraries from there.

A few useful npm commands to look into are:

  * `npm install <library name>`
  * `npm install -g <library name>`
  * `npm init package.json`
  * `install --save`
