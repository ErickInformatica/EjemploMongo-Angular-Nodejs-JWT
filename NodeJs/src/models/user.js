'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    nick: String,
    email: String,
    role: String,
    password: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);