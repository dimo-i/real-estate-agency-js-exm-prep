const mongoose = require('mongoose');

const enumValues = {
    values: ['Apartment', 'Villa', 'House'],
    message: "Please choose valid type: Apartment, Villa, House"
}

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'name should be at least 6 characters long!']
    }, 
    type: {
        type: String,
        enum: enumValues,
        required: true,
    }, 
    year: {
        type: Number,
        required: true,
        min: 1850,
        max: 2021
    }, 
    city: {
        type: String,
        required: true,
        minlength: [4, 'city should be at least 4 characters long!']
    }, 
    homeImage: {
        type: String,
        required: true,
        //todo validate if is valid url "starts with http or https"        
    }, 
    description: {
        type: String,
        required: true,
        maxlength: [60, 'description should not be more than 60 characters long!']
    }, 
    availablePieces: {
        type: Number,
        required: true,
        min: 0,
        max: 10,

    }, 
    rentedHome: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }], 
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }, 


})





const Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;