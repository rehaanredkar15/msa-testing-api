const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const { verifyFCMToken } = require('../../../middleware/authMiddleware');

// adding rate limit for the routes so that unwanted load of requests doesn't harm server
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: 'You exceeded daily requests limit!', // message to send
});

const router = new Router();

// router.use('/events', verifyFCMToken, require('./api/EventsApi/EventsClientApi'));
router.use('/events', verifyFCMToken, require('./api/EventsApi/EventsClientApi'));

// router.use('/masjid', verifyFCMToken, require('./api/MasjidApi/MasjidClientApi'));
router.use('/masjid',  require('./api/MasjidApi/MasjidClientApi'));

// router.use('/timings', verifyFCMToken, require('./api/TimingsApi/TimingClientApi'), limit);
router.use('/timings',  require('./api/TimingsApi/TimingClientApi'), limit);

router.use('/auth', require('./api/AuthApi'));

module.exports = router;
