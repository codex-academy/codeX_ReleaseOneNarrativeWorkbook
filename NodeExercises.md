# Node exercises

**remember to commit to github regularly**

## Need to wrap your head around Node js

Try these code challanges to wrap you head around node JS.

Be sure to create a ```NarrativeWorkbook``` folder in your projects folder. And do the challenges in there, be sure to commit to github regularly.

### Guess the number:

Write a simple number guessing game:

* where your program generate a random number less than 100
* the player should guess the number by entering on the command line
* if the number is to low let the user know with an orange error message
* if too high let the user know with a red error message
* if correct display to the user 'Yeah, the correct number is <the number they guessed>. It took you <number of guesses> guesses!'

Use these modules:

* [readline-sync](https://www.npmjs.com/package/readline-sync)
* [chalk](https://www.npmjs.com/package/chalk)

### TestMyCode in Node JS

Convert the TestMyCode framework to run in node js. You will quickly see there is no DOM now.

But get Red & Green on the command line using one of these modules on the console

* [bash-color](https://www.npmjs.com/package/bash-color)
* [chalk](https://www.npmjs.com/package/chalk)

You will need to make TestMyCode a module so that you can easily import it into your test scripts.
Use it to test a few functions.

### Word fun

Create a utility using TDD (use TestMyCode) that is a module that has these functions:

* makeUpper - take a sentence and the index of the word in the sentence to make uppercase, it then make the correct word uppercase
* makeLower - take a sentence and the index of the word in the sentence to make lowercase, it then make the correct word lowercase
* capitalize - take a sentence and the index of the word in the sentence to capitalize, it then capitalize the correct word.
