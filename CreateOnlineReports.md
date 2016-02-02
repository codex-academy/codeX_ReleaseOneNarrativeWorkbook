# Create online reports

## Background

Now let's display all the data you mined from the Nelissa's CSV File online. For that you will need a web server, a template engine, and data. You already have the data. As a web server we will be using Express JS and as a template engine Handlebars JS. You will install all these dependencies using `npm`

There are loads of alternatives to all the above in the Node JS ecosystem, but knowing how the selected toolset works will give you a good baseline to explore alternatives from.

You should focus on:

* [Express JS](http://expressjs.com/)
* [Handlebars JS](http://handlebarsjs.com/)
* [Handlebars JS & Express integration layer](https://www.npmjs.com/package/express-handlebars)

## Concepts

Some concepts you might bump into while doing this work.

* JSON
    * Javascript Object Notation
    * Data Interchange - alternative to XML
    * Use require statement to import data
* Templates
    * HTML & CSS
    * Layout
    * [Handlebars JS](http://handlebarsjs.com/)
* Web Server
    * [Express JS](http://expressjs.com/)
        * Create routes
        * Combine data and template
        * Renders dynamic content using a view engine

[Express JS basics](express_basics.md)

[Express rendering data](express_rendering.md)

[Templating](templating.md)

## Combining templates & data

As we need to display the data in the web browser we use the templates, which is how we would like the data to be displayed, with what needs to be displayed, which is the data.

It goes like this:

```
template + data = web page
```

So we somehow need to combine templates and data in Express JS. Luckily there is already a [Node module that is combining Express JS and Handlebars](https://www.npmjs.com/package/express-handlebars).

Integrate handlebars templating into your spaza-app Express application.

## Display data from Nelisa's CSV

You should now know enough to display online reports for Nelisa.

## Useful links:

* [Loading JSON files using require](https://nodejs.org/api/modules.html#modules_file_modules)
* [Express JS](http://expressjs.com/)
* [Handlebars JS](http://handlebarsjs.com/)
* [Mustache](https://mustache.github.io/)

[Layout & CSS](layout_and_css.md)
