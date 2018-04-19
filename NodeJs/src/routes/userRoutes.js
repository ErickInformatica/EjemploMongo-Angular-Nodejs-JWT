'use strict'

var express = require('express');
var UserController = require('../controllers/userController');
var md_auth = require('../middlewares/authenticated');

//Upluad Image
var multipart = require('connect-multiparty');
var md_upload =  multipart({uploadDir: './src/uploads/users'});

var api = express.Router();
api.get('/home', md_auth.ensureAuth ,UserController.home);
api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.post('/update-image-user/:id', [md_auth.ensureAuth, md_upload] ,UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.put('/update-user/:id', md_auth.ensureAuth ,UserController.updateUser);
module.exports = api;