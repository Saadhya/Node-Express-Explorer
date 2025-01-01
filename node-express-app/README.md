# TO RUN THIS APP
node --watch-path=. ./app-express.mjs

steps:
- created mjs file for nodejs server
- developing apis for HTTP methods.
- created ejs server for rendering data on html pages

# Plan for working with HTTP cookies in express
- import cookie-parser library
npm install cookie-parser
- add js to template to make the place order button work
- create a route to handle the cart button and save into a cookie
 
# Steps to save data in an HTTP Cookie in Express
- check if cookie already exist
- add data to the cookie object
- return the cookie to the client

# Express middleware

# Error handling

# logging with winston
- winston log levels:-
error, warn, info, http, verbose, debug, silly= high to low severity
- creating log with winston in nodejs
const logger= createLogger({
  level:'info',
  format: winston.format.combine(
    // format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports:[
    new transports.File({filename:'app-express.log'}),
    new transports.Console()
  ]  
})

# debugging with --inspect
- node --inspect src/app-express.mjs (to run this command, stay on the url=> node-express-app)
- run this in the browser- chrome://inspect/#devices
- here, clicking on inspect under devices- it will open server window
- we can add debugger in the file on browser itself and run through the errors.


# to learn about wrapper- fetch vs axios
- interceptors
- baseurl
- common-config- change url and error handling
