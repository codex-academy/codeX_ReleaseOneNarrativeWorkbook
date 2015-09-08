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

Now let's [use your newly found knowledge about modules](lets-get-modular.md).
