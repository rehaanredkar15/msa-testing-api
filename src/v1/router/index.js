const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { verifyFCMToken } = require('../../../middleware/authMiddleware');

// adding rate limit for the routes so that unwanted load of requests doesnt harm server
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: 'You exceeded daily requests limit!', // message to send
});

const router = new Router();

// router.use('/admin/events', verifyAdminAccessToken, require('./api/EventsApi/EventsAdminApi'));
router.use('/events', verifyFCMToken, require('./api/EventsApi/EventsClientApi'));

// router.use('/admin/masjid', verifyAdminAccessToken, require('./api/MasjidApi/MasjidAdminApi'));
router.use('/masjid', verifyFCMToken, require('./api/MasjidApi/MasjidClientApi'));

// router.use('/admin/timings',verifyAdminAccessToken,require('./api/TimingsApi/TimingAdminApi'));
router.use('/timings', verifyFCMToken, require('./api/TimingsApi/TimingClientApi'), limit);

// router.use('/admindetails', verifyAdminAccessToken, require('./api/AdminApi'));
router.use('/auth', require('./api/AuthApi'));

module.exports = router;
