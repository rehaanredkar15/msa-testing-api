const { Router } = require('express');
const {
  adminRegister, adminLogin, ClientRefreshingToken, refreshingToken, ResetPassword,
} = require('../../controllers/AuthController');

const AuthApi = new Router();

// Get all the ents
AuthApi.post('/adminRegister', adminRegister);
AuthApi.post('/adminLogin', adminLogin);
AuthApi.post('/refresh', refreshingToken);
AuthApi.post('/clientRefresh', ClientRefreshingToken);
AuthApi.post('/resetPassword', ResetPassword);

module.exports = AuthApi;
