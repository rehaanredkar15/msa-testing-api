const bcrypt = require('bcrypt');
// const JWT = require('jsonwebtoken');
const Admin = require('../model/AdminSchema');
const { signAdminAccessToken, signAdminRefreshToken, verifyAdminRefreshToken } = require('../../../helpers/admin_jwt_helper');
const { signClientAccessToken, signClientRefreshToken } = require('../../../helpers/jwt_helper');
const { verifyClientRefreshToken } = require('../../../middleware/authMiddleware');
// const emailConfiguration = require('../../../helpers/emailConfiguration');

// REGISTER
// @desc register new admin
// @route GET /api/v1/events/getAllEvent
// @access Public
exports.adminRegister = async (req, res) => {
  try {
    const {
      adminName, email, password, role,
    } = req.body;

    const admin = await Admin.create({
      adminName,
      email,
      role,
      password,
    });
    const token = signAdminAccessToken(adminName);
    const refreshToken = await signAdminRefreshToken(admin.adminName);
    res.status(200).json({
      data: admin,
      authTokens: { token, refreshToken },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    res.status(500).json('Please provide an email and password');
  }
  try {
    // Check that user exists by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(500).json({ message: 'Error: Invalid email' });
    } else {
      const validPassword = await bcrypt.compare(req.body.password, admin.password);
      if (validPassword) {
        const token = await signAdminAccessToken(admin.adminName);
        const refresh = await signAdminRefreshToken(admin.adminName);

        res.status(200).json({
          data: admin,
          authTokens: { token, refresh },
        });
      } else {
        res.status(500).json('Invalid Credentials');
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.refreshingToken = async (req, res) => {
  const { refresh } = req.body;

  if (!refresh) {
    res.status(500).json('Please provide an refresh token');
  }
  try {
    // const adminName = JWT.verify(refresh, process.env.ADMIN_REFRESH_TOKEN_SECRET);
    const adminName = await verifyAdminRefreshToken(refresh);
    const token = await signAdminAccessToken(adminName);
    const refToken = await signAdminRefreshToken(adminName);

    res.send({ token, refreshToken: refToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

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

exports.ResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await Admin.findOne({ email });
    // !user && res.status(404).json('User Not Found');

    // const resetToken = user.getResetPasswordToken();
    await user.save();
    // Create reset url to email to provided email
    // const resetUrl = `https://socialsmile.netlify.app/resetpassword/${resetToken}`;
    // HTML Message
    // const message = `
    //   <h1>Hello ${user.username},</h1>
    //   <h3>You have requested a password reset</h3>
    //   <p>Tap Below to reset Your password:</p>
    //   `;

    // <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    try {
      // await emailConfiguration({
      //   to: user.email,
      //   subject: 'Password Reset Request',
      //   text: message,
      // });
      res.status(200).json({ success: true, data: 'Email Sent Successfully ' });
    } catch (error) {
      await user.save();

      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
