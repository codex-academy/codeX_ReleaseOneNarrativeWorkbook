## Let's get modular

Now let's use your newly found knowledge about modules.

You will now create a new module and also use some of NodeJS's built-in modules. The module should be able to return a list of all the rows in all the files in a specified folder. Your module should be able to do that Synchronously and Asynchronously.

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
