# Unit Testing in Node JS

To test your NodeJS code you can use the QUnit module that is available in npm.

`npm` is the Node Package Manager - it's backed by a rich repository of modules, available at https://www.npmjs.com/ that you can use in your Node JS projects.

## Installing QUnit

You can look at the QUnit module here: https://www.npmjs.com/package/qunit

To install QUnit type this command in a terminal window : `sudo npm install -g qunit`

This will install it as a global command, so you should be able to execute the `qunit` command whenever you open a terminal window.

## Using Qunit

You write QUnit tests for Node JS (server side tests) in the same way you wrote tests for Javascript running in the browser.

Create a folder called `test` in you project folder,  put all your tests in this folder.

A typical test looks like this:

```javascript
QUnit.test("a basic test example", function () {
    ok(true, "this test is fine");
    var value = "hello";
    equal("hello", value, "We expect value to be hello");
});
```

For testing asynchronous callback you can write tests like this:

```javascript
QUnit.test("a basic test example", function () {

    var value = "hello";
    //you need to add this
    stop();

    anAsyncFunc(function(){
        // body...
        equal("hello", value, "We expect value to be hello");
        //and the line below need to be in your callback
        start();
    });

});
```

Note that all the functions and Objects you are testing should be in a module that you should import in your test using the `require` statement as above.
