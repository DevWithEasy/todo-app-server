require('dotenv').config();
const express = require('express')
const app = express()

//routers
const databaseConnect = require('./midleware/connection');
const ErrorHandler = require('./midleware/error');
const middlewares = require('./midleware/midlewares');
const routers = require('./router/routers');

//midlewares setup
middlewares(app)

//routers
routers(app)

//database connection setup
databaseConnect()

//Error Handle
ErrorHandler(app)

//app server initailized
const port = process.env.PORT || 8080;
app.listen(port , ()=>{
    console.log('listening on port 8080');
})