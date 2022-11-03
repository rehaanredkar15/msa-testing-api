const { Router } = require('express');
const {
  ClientRefreshingToken, GetLocationDetailsFromIp
} = require('../../controllers/AuthController');

const AuthApi = new Router();

// Get the client token refreshed
AuthApi.post('/clientRefresh', ClientRefreshingToken);

// Get the client token refreshed
AuthApi.post('/getLocationDetailsFromIp', GetLocationDetailsFromIp);

module.exports = AuthApi;
