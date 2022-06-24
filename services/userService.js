const User = require('../models/User');

exports.getOne = (userId) => User.findById(userId);

exports.addHousing = (userId, housingId) => {

    return User.updateOne({_id: userId}, {$push: {ownedProperties: housingId}});
}
