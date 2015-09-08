#Capture and storing data

So far you have spent a lot of time and effort slicing and dicing data. You started off using a CSV file as a data source which you then migrated into a database. Once your data was in the database it became much easier to query that data. How do we get data into your database? That is what we will explore next. We will go one step further, we will start capturing data from a web browser and storing it in a database.

To capture data on a web page one needs an HTML form with fields to allow data to be entered into the web page. Once the data is entered on the web page one needs to store the data somewhere. There are various different ways of doing that, but we will be focusing on web forms.

## Web forms

The ```<form>``` element wraps the various different types of web form elements.

The basic web form elements used for capturing data are:
* input - various different types including:
  * text
  * button
  * radio
  * checkbox
* text area
* button
* submit
* select
* hidden

A web form needs action and type attributes and a submit button.

For example:

```html
  <form action="/add_product" type="POST">
    Product name: <input type="text" name="product_name">
    <input type="submit">
  </form>
```

The web form above will send a ```POST``` request to the ```add_product``` route. The form will contain the value that was entered in the browser in the ```product_name``` field of the form.

You can use CSS to style your HTML forms. They can be tricky to style.

## Server side variables

When one creates routes in Express the route callbacks always take two parameters, req and res. Those two variables are Request (req) and Response (res) respectively:

Here is a quick example:

```javascript
app.post('/add_product', function(req, res){
 res.render('product', {product :  data});
});
```

In this example the response object is used to render a template to the client, but the form data is not captured yet.

Now look at this example:

```javascript
app.post('/add_product', function(req, res){
 var formData = req.body;
 console.log(formData.product_name);
 res.render('product', {product_name :  formData.product_name});
});
```

It reads the form data, prints it to the console and sends it to the template to be rendered back to the client.
This example is only reading one field, but you can read all the fields that are being sent from the form to the route.

**Note:*** For form variables to work in Express you need to configure some middleware that will process the form parameters. Use the body-parser middleware : https://www.npmjs.com/package/body-parser

Here's an example: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters#post-parameters

## Routes

Forms are one way to send data to the server, but you can also use routes to send some data to the server.

For example:

```
app.get('/products/:id', function(req, res){
  console.log(req.params.id);
  res.send("you sent me : " + req.params.id);
});
```

This translates to something like this: ```http://localhost:3000/products/77``` and it will return ```you sent me : 77``` to the browser.

This is especially useful for creating edit or view pages in your web application where you can see or edit the details of a data entity.

Here's an example: https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters#specific-routing-for-specific-parameters

## Database
