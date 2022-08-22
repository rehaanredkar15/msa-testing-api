/* eslint-disable no-unused-vars */
const { getAuth } = require('firebase-admin');
const admin = require('firebase-admin');
const JWT = require('jsonwebtoken');
const serviceAccount = require('../google-services.json');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {

  verifyFCMToken: async (req, res, next) => {
    try {
      const fcmToken = req.headers.authorization?.split(' ')[1];

      const verifyFCMToken = () => admin.messaging().send({
        token: fcmToken,
      }, true);

      verifyFCMToken('YOUR_FCM_TOKEN_HERE')
        .then((result) => next())
        .catch((err) => res.status(401).send({ message: 'Error:Invalid Token' }));
    } catch (error) {
      res.status(401).send({ message: 'Error:Invalid Token' });
    }
  },
  verifyClientAccessToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({ message: 'Error: A token is required for authentication' });
    }
    try {
      JWT.verify(token, process.env.CLIENT_JWT_SECRET_KEY, (err, payload) => {
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
