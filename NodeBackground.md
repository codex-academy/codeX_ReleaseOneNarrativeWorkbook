# Node Background

This is a high level overview of concepts that you will need to be familiar with when you are using Node JS. This focuses on things that are different from the JavaScript you used so far. Node JS is JavaScript outside the browser and you can use your JavaScript knowledge to good use to do some interesting things on the backend.

Node JS introduce things such as :

* Asynchronous code that uses callbacks
* An API of its own - file access for example
* Modules to share code
* npm to install/share 3rd party modules

Each one will be briefly discussed below.

## Asynchronous

What does Asynchronous mean, you ask?

>  Node does I/O (input / output) in a way that is asynchronous which lets it handle lots of different things simultaneously. For example, if you go down to a fast food joint and order a cheeseburger they will immediately take your order and then make you wait around until the cheeseburger is ready. In the meantime they can take other orders and start cooking cheeseburgers for other people. Imagine if you had to wait at the register for your cheeseburger, blocking all other people in line from ordering while they cooked your burger! This is called blocking I/O because all I/O (cooking cheeseburgers) happens one at a time. Node, on the other hand, is non-blocking, which means it can cook many cheeseburgers at once.

[Callback basics](callback_basics.md)

## Node API

Over and above the normal capabilities of JavaScript, Node JS can do loads more things like:

* reading and creating files on disk
* making HTTP calls
* hosting a HTTP/TCP server

If you are curious about what is possible have a look at the [Node API](http://nodejs.org/api/).

But don't get bogged down in the details too much at this stage.

[Module basics](modules.md)
