/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
  verifyAdminAccessToken: (req, res, next) => {
    let token;
    if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization?.split(' ')[1];
    } else {
      token = req.headers.authorization;
    }
    if (!token) {
      return res.status(403).send({ message: 'Error: A token is required for authentication' });
    }
    try {
      JWT.verify(token, process.env.ADMIN_JWT_SECRET_KEY, (err, payload) => {
        if (err) {
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          throw err(message);
        }
        req.payload = payload;
      });
    } catch (err) {
      return res.status(401).send({ message: 'Error:Invalid Token' });
    }
    return next();
  },
};
