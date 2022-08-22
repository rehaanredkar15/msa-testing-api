/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  signClientAccessToken: (Id) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.CLIENT_JWT_SECRET_KEY;
    const options = {
      expiresIn: '2min',
      issuer: 'pickurpage.com',
      audience: Id,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(token);
    });
  }),
  signClientRefreshToken: (userId) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.CLIENT_REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1d',
      issuer: 'pickurpage.com',
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(err);
      }
    });
  }),
  verifyClientRefreshToken: (refreshToken) => new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      process.env.CLIENT_REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) return reject();
        const userId = payload.aud;
      },
    );
  }),
};
