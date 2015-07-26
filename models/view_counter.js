var mongoose = require('mongoose');

var ViewCounter = new mongoose.Schema({
	count: Number
});

module.exports = mongoose.model('ViewCounter', ViewCounter);