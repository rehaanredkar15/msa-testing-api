const { Router } = require('express');
const {
  ClientRefreshingToken,
} = require('../../controllers/AuthController');

const AuthApi = new Router();

// Get the client token refreshed
AuthApi.post('/clientRefresh', ClientRefreshingToken);

module.exports = AuthApi;
