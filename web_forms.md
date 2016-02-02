# Web forms

The `<form>` element wraps the various different types of web form elements.

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

The web form above will send a `POST` request to the `add_product` route. The form will contain the value that was entered in the browser in the `product_name` field of the form.

You can use CSS to style your HTML forms. They can be tricky to style.
