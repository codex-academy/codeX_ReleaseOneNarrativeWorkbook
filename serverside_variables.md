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

**Note:*** For form variables to work in Express you need to configure some middleware that will process the form parameters. Use the [body-parser middleware](https://www.npmjs.com/package/body-parser).

Here's an example: [Use ExpressJS to Get URL and POST Parameters: POST Parameters](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters#post-parameters).
