# User role support

## Authentication & Authorization

Web applications needs a way of knowing which users are logged into the system and what these users can and can't do. Authentication is the process of getting to know a user. This normally involves a username and a password. Authorization is the process of checking what a user can do once they are Authenticated in the system. Functionality in a system is normally broken down into roles, with roles being assigned to users.

The process goes something like this, a user is identified as they log into the system. Once a user is identified, their roles are located. The system uses these roles to determine what a user can and can't do.

## The details

[Http Sessions](http_sessions.md)

[Middleware](middleware.md)

To support login for the `/users` route above you would need to put a user Object in the session. For logout you will need to remove the user Object from the session using the `delete` statement.

[Authentication](authentication.md)

## Resources

Once you understand the Authentication basics you can look into some third party Authentication modules in npm. For example, [Passport JS](http://passportjs.org/docs) supports a wide array of Authentication methods including Google, Facebook, Github, etc.
