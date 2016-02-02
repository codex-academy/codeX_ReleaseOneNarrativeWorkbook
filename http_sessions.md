### HTTP Sessions

As HTTP is a stateless protocol by design, to store user session information one needs a way of managing state when using it. HTTP Sessions are used for that. An HTTP session uses a combination of Cookies for client side storage and Server Side storage.

For security reasons one would like to store the minimum amount of data on the client. On the server side the session data can be stored either straight on disk or in a database of sorts. The Cookie normally contains an encrypted token that associates the HTTP session with the Session Data stored on the Server. An expiry time can be set on a HTTP Session to allow for a users login to expire if they are not actively using the application.

To add HTTP Session support to your Express Server you need to install the [express-session package](https://www.npmjs.com/package/express-session).
