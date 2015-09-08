# Importing data into MySQL

There are various different ways to import data into a MYSQL database. You can either write a program/script, using Node JS for example, to read a CSV file and then execute `insert` statements to import the data into the database or you could use the [LOAD DATA](https://dev.mysql.com/doc/refman/5.1/en/load-data.html) command from MySQL or you can you the import functiontionality from PhpMyAdmin for example.

Once the data is in your database you then need to write some insert statements to create the data in the correct tables. You will need to write some SQL joins to insert the correct foreign keys into the tables.

## Source data

To safe you some time here is a MySQL dump that already contains the data for Nelissa's Sales and Purchase history. Use them as a baseline for your database. This data was load using the LOAD DATA command.

Here is the dump file: [Spaza-MySQL-Dump.sql](./Spaza-MySQL-Dump.sql)

To use this dump file:

* Create a database you would like to restore the dump into
* Then use this command: `mysql -u root -p <database_name> < Spaza-MySQL-Dump.sql`
* This should create 2 tables into your target database called, `orders_table` and `purchase_table`
* Now you have some tables you can use to populate your datamodel from
