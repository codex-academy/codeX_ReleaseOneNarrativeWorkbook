# Data Modeling and Persistence

Applications need a way of storing and manipulating data. That is what databases are for. Databases makes it easy to store, structure, retrieve and manage data.

## Database basics

Databases put data that belongs together in tables; each table has multiple entries called rows and each row can have multiple fields.

One can link tables using fields, by creating a field in one table and referencing that field from another table. These fields are used to create relationships between tables, that's why they're called relational databases.

### Database components

* Tables
* Rows
* Fields
* Keys
  * Primary key - a field that makes a row unique
  * Foreign key - a field that reference a key in another table

[Data modelling](data_modelling.md)

## SQL

Once one have a database one needs a way of manipulating the data in the database. One needs to be able to insert, query, update and delete the data. This is where SQL comes in.

SQL stands for Structured Query Language. It's a data manipulation language that allows one to easily find (query) and create data. SQL has 4 basic operations: insert, delete, update and select. The `select` operation being the one to find existing data in the database the other operations are self explanatory. One uses the fields in the tables to link tables together.

## CRUD - create, read, update and delete

One can use SQL to create some CRUD screens to manipulates data.

## Learn it

Now that you have a basic high level understanding of database bases and SQL work your way through this tutorial:

* [SQL Teaching](http://www.sqlteaching.com/)
* [SQL on Learn Code The Hard Way](http://sql.learncodethehardway.org/)

## Aggregating data

Once your data is in a database you can use it to calculate aggregates like averages, max or min values.

Some more details about SQL Aggregate Functions on:

* [sqlclauses](http://www.sqlclauses.com/sql+aggregate+functions/)
* [mysqltutorial](http://www.mysqltutorial.org/mysql-aggregate-functions.aspx)
* [techotopia](http://www.techotopia.com/index.php/MySQL_Data_Aggregation_Functions)

## MySQL

For our project we will use the widely used open source MySQL database:

[Here is a basic tutorial](https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial) to get going.

## MySQL and Node JS

Now let's see how to use MySQL with NodeJS to Create, Read, Update and Delete (CRUD) data.

Work your way through this [basic CRUD Example](https://github.com/codex-academy/codeX_BasicCRUDExample).

## Data model & CRUD for Nelisa

Now use your database knowledge to:

* create a data model for Nelisa's Spaza Shop
* create a MySQL database this data model
* import the CSV files you have from Nelisa into the database
* change your web application to use the database

### Import data using a sqldump file:

One can use the `mysqldump` utility to export and import data into a database. There is a mysql dump file added to  this repository that you can use as a starting point for your Nelisa's database, it's called `Spaza-MySQL-Dump.sql`.

You can use it like this

Type in the terminal:

```
mysql -u root -p
```

This tells MySQL that you want to log in. `-u root` means the user called root. `-p` means log in with a password. Since we didn't supply a password, MySQL will ask us for one.

Then do:

```
mysql> create database <you db name>;
mysql> use <your db name>;
mysql> source Spaza-MySQL-Dump.sql;
```

You can import the dump file from the terminal using `mysqldump` as well.

After importing the dump file into your database you should have two tables in your database:
* sales_csv
* stock_purchases_csv

## Next steps

Now that you have a database that contains the data from the CSV file we have a base to start our data model from. When creating a data model one needs to be sure that one removes all repetition, when changing the product name one should only need to do it in one place. The process of removing data repetition is called [Normalization](https://en.wikipedia.org/wiki/Data_normalization). So we need to create tables for all the different entities and be sure they relate to each other correctly. Relationships between tables are created using fields, a primary key in one table can be stored as  foreign key table in another table to create a data model. Data models enables us to reflect the data storage needs of systems to store and retrieve data effectively.

###To populate the database:

* Create a data model that includes a table for Sales, Purchases, Products, Categories and Suppliers.
     * Be sure that the tables relate to each other correctly using foreign keys.
     * The data model should be created using a script file. A text file with a .sql extension, store this file in the root of your project.
* Populate the data model using the data in the CSV tables
    * Populate Products & Categories:  
        * Create insert scripts to create data for the Categories table
        * Create insert scripts that will create Products linked to their Categories
            * You can use the `distinct` sql statement to create a unique list of Products  
    * Populate the Sales table:
        * Use the `sales_csv` table joined with the `Products` table to insert the correct foreign keys into the Sales table
        * Use a insert statement with a select statement - http://stackoverflow.com/questions/5391344/insert-with-select
        * Join the `sales_csv` and the `Products` table on the product name column to get the product id to use as the foreign key.
    * Populate the Purchase & Supplier tables
    * Populate the Supplier tables from the data in the `stock_purchases_csv` table - use the select insert method described above. Using `select distict` will help you to get a unique list of suppliers.
    * Join the Products and the Suppliers tables using the Product and Supplier Names to get the appropriate foreign keys.

### Use the database

Now use the database you just created to answers Nelisa's questions about her data. You will need to use joins to use data from the various tables. Aggregate functions such as SUM, COUNT and AVERAGE in combination with the `GROUP BY` clause will make it easy for you to calculate the most popular product and category and the other data Nelisa requires.

## Node database packages:

* [sqlite3](https://www.npmjs.com/package/sqlite3)
* [mysql](https://www.npmjs.com/package/mysql)
