# Setup Ubuntu, Node JS server with MySQL

Create a new Ubuntu server on Digital Ocean. Be sure that your Code Mentor sent you an email invitation to Digital Ocean.

## Login

Once you have a server login to it using [ssh](https://en.wikipedia.org/wiki/Secure_Shell)

In a terminal login to your remote server using ssh:

`ssh root@<your ip address>`

You will be prompted for a password - use the password that Digital Ocean emailed you. You will also need to change your root password. Follow the prompts to change the password. 

`apt-get update`

## Setup the server

First setup your server by following these [instructions](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)


Decide in one a DNS name for your server: `<server_name>.projectcodex.co` then email it with your servers IP address to your Tech Mentor to link it to the domain name to the IP address.

##Now install node :

* sudo apt-get install nodejs
* sudo apt-get install nodejs-legacy
* sudo apt-get install npm

## Create sample application online

Now follow this article from [Create Node.js Application
 ](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) downwards.

## Setup mysql

Setup mysql on the server as per these [instructions](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-14-04). Please note you only want to install MySql

## Deploy your application

Now deploy your application: 
* Create an apps folder in your home folder
* Clone your application from github into that folder.
* Setup your database on the server.
* Start it up with pm2




