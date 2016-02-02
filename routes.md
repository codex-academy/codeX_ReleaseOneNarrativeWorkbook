# Routes

Forms are one way to send data to the server, but you can also use routes to send some data to the server.

For example:

```javascript
app.get('/products/:id', function(req, res){
  console.log(req.params.id);
  res.send("you sent me : " + req.params.id);
});
```

This translates to something like this: `http://localhost:3000/products/77` and it will return `you sent me : 77` to the browser.

This is especially useful for creating edit or view pages in your web application where you can see or edit the details of a data entity.

Here's an example: [Use ExpressJS to Get URL and POST Parameters: Specific Routing for Specific Parameters](https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters#specific-routing-for-specific-parameters)
