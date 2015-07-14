#Create a more interactive experience

To create a more interactive web application experience to users you need to take control of page rendering and minimize page refreshes. Instead of refreshing a whole page, refreshing only certain fragments of a page results in better user experience. 

To refresh only certain fragments of the page one use AJAX, which is based upon the ```XMLHttpRequest``` object. This allows one to send HTTP requests, such as GET and POST, to the backend asyncronously. See more details about the XMLHttpRequest here: http://eloquentjavascript.net/17_http.html

##AJAX using jQuery

JQuery make it easier to use AJAX by abstracting away the details of XMLHttpRequest.

To make a HTTP GET Ajax call using JQuery:

```javascript
  jQuery.get('/url/to/call', function(result){
    // display the results of the call in a DIV
    document.getElementById('targetDiv').innerHTML = result;
    //or use jQuery
    //jQuery('#targetDiv').html(result);
    
  });
```

alternatively the call can return a Javascript Object (JSON):

```javascript
  jQuery.get('/url/to/call', function(result){
    // display the results of the call in a DIV
    
    var products = result.products;
    
    // loop through the products...
    products.forEach(function(product){
      //we just display the product to the console.
      console.log(product.name)  
    });
  });
```

See some more details here: https://api.jquery.com/jquery.get/#jQuery-get-url-data-success-dataType

For sending form data to the server side using AJAX one should use HTTP POST.

The example below will do a HTTP Post when a button is clicked.

```javascript

jQuery.click('#submitForm', function(){

  jQuery.post('/url/to/post-to', {field1 : "one", field2 : "two"}, function(result){
    console.log(result)
  });

});
```

See more details about POST here:  https://api.jquery.com/jQuery.post/#jQuery-post-url-data-success-dataType

## Different styles

Ajax calls can either return sections of HTML that you can render on the client side or it can return some datasets in JSON or XML format which one can use on the client side to render data into the DOM.

Using the HTML sections is easier to use, but using the returned datasets is a more flexible approach.

## Realities of Ajax

Ajax gives you much more flexibility, but makes your client side javascript more complicated. As it moves some of the logic from the serverside to the client side.

## Try this using Ajax:

Let's add and interactive search bar to your Products screen.

The search bar should:
    * start searching after you typed 3 characters
    * only display the products that match the search
    * the search should match both Product and Category names
    * if the search bar is empty all products should be displayed
  
