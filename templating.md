# Templating

We will be using `handlebars` as the template engine, it combines data with templates to render information.

A typical handlebars template look likes this

```handlebars
<div class="entry">
  {{#if author}}
    <h1>{{firstName}} {{lastName}}</h1>
  {{/if}}
</div>
```

Combining the above with data like this:

```javascript
var user = {
 author : true,
 firstName : "Jo",
 lastName : "Blogss"
};
```

results in a html enriched with some data.

Handlebars JS is built on top of Mustache templating engine and extends it. Mustache templating aims to be logic-less templating, but that aim makes it hard to use at times.

See some more information on how the templates works on [the Mustache website](https://mustache.github.io/mustache.5.html).

See some background information on the difference between Handlebars and Mustache: [What are the differences between Mustache.js and Handlebars.js?](http://stackoverflow.com/questions/10555820/what-are-the-differences-between-mustache-js-and-handlebars-js)

Handlebars comes with a set of built in helpers that makes it easy for one to process data and convert it into a layout. It [supports things like if statements and loops](http://handlebarsjs.com/builtin_helpers.html).

http://handlebarsjs.com/builtin_helpers.html
