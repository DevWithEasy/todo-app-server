const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const midleware = [
    express.static('public'),
    express.json(),
    express.urlencoded({extended: false}),
    morgan('dev'),
    cors()
]
const middlewares = (app)=>{
    midleware.forEach(middleware => app.use(middleware))
}

module.exports = middlewares