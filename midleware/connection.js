const  mongoose = require('mongoose');

const databaseConnect=()=>{
    mongoose.connect(process.env.DB_URL)
        .then(res=> console.log('Database connection established'))
        .catch(err=> console.log('Error connecting to database'))
}

module.exports = databaseConnect