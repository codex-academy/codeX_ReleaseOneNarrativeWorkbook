## Implementing your own Authentication

Once your server supports HTTP Sessions and you understand the basics of Express middleware you can start thinking of how to implement some user Authentication & Authorization.

So let's start simple. Create a simple Authentication system that:

* Allows a user to login
* Redirects a user back to the login screen with a message if their login attempt failed
* Allows a user to login using the username 'UserOne' with a password of 'thereWeG0'
* Allows the user to logout

Let's extend that to a system that:

* Allows a user to login
* Redirects a user back to the login screen with a message if their login attempt failed
* Allows a user to register - use an in memory store. If the server is restarted the credentials will be gone

Now for a more advanced implementation. A system that:

* Allows user to login
* Redirects a user back to the login screen with a message if their login attempt failed
* Allows a user to register:
    * Stores user details in a database table
    * Encrypts the user password. Tip: look at [the bcrypt module](https://www.npmjs.com/package/bcrypt-nodejs) in npm.
* Locks the users account if they supply the wrong password 3 times in a row.
* Allows a user to logout

Once you have mastered the above you should have a good understanding of how the Authentication process works. How do you think you should handle the Authorization process?
