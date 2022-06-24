const mongoose = require('mongoose');

const {DB_QUERYSTRING} = require('./env');

exports.dbInit = () => {
    
    mongoose.connection.on('open', () => console.log('Data Base is connected!'));
    return mongoose.connect(DB_QUERYSTRING);


}
