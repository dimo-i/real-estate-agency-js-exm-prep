const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env')



const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, 'Names are required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [5, 'username should be at least 5 characters long!']
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'password should be at least 4 characters long!']
    },

    ownedProperties: [{
        type: mongoose.Types.ObjectId,
        ref: 'Housing',
    }],

    rentedProperties: [{
        type: mongoose.Types.ObjectId,
        ref: 'Housing',
    }]


});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
    .then(hashedPassword => {
        this.password = hashedPassword
        next()
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;