const Housing = require('../models/Housing');

exports.getAll = () => Housing.find();

exports.create = (housingData) => Housing.create(housingData);

exports.getOne = (housingId) => Housing.findById(housingId);

exports.getOneDetailed = (housingId) => Housing.findById(housingId).populate('rentedHome'); //populate owner

exports.updateOne = (housingId, housingData) => Housing.updateOne({_id: housingId}, {$set: housingData}, {runValidators: true});

exports.delete = (housingId) => Housing.deleteOne({_id: housingId})