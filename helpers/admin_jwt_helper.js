/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  signAdminAccessToken: (adminName) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ADMIN_JWT_SECRET_KEY;
    const options = {
      expiresIn: '1min',
      issuer: 'msasoftware.com',
      audience: adminName,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject();
        return;
      }
      resolve(token);
    });
  }),
  signAdminRefreshToken: (adminName) => new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ADMIN_REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1d',
      issuer: 'msasoftware.com',
      audience: adminName,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  }),
  // verifyAdminRefreshToken: (refreshToken) => new Promise((resolve, reject) => {
  //   JWT.verify(
  //     refreshToken,
  //     process.env.ADMIN_REFRESH_TOKEN_SECRET,
  //     (err, payload) => {
  //       if (err) return reject(err);
  //       const userId = payload.aud;
  //     },
  //   );
  // }),

  verifyAdminRefreshToken: (refreshToken) => new Promise((resolve, reject) => {
    // try {
    JWT.verify(
      refreshToken,
      process.env.ADMIN_REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        const userId = payload.aud;
        resolve(userId);
      },
    );
    // } catch (err) {
    // console.log(err);
    // reject(err);
    // }
  }),
};
