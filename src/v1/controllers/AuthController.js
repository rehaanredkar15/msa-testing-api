const { signClientAccessToken, signClientRefreshToken } = require('../../../helpers/jwt_helper');
const { verifyClientRefreshToken } = require('../../../middleware/authMiddleware');

exports.ClientRefreshingToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(500).json('Please provide an refresh token');
  }
  try {
    const adminName = verifyClientRefreshToken(refreshToken);
    const accessToken = await signClientAccessToken(adminName);
    const refToken = await signClientRefreshToken(adminName);

    res.send({ accessToken, refreshToken: refToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
