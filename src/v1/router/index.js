const { Router } = require('express');
const rateLimit = require('express-rate-limit');
// const { verifyClientAccessToken } = require('../../../middleware/authMiddleware');

// adding rate limit for the routes so that unwanted load of requests doesnt harm server
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: 'You exceeded daily requests limit!', // message to send
});

const router = new Router();

// router.use('/events', verifyClientAccessToken, require('./api/EventsApi/EventsClientApi'));
router.use('/events', require('./api/EventsApi/EventsClientApi'));

// router.use('/masjid', verifyClientAccessToken, require('./api/MasjidApi/MasjidClientApi'));
router.use('/masjid', require('./api/MasjidApi/MasjidClientApi'));

// router.use('/timings', verifyClientAccessToken,
//  require('./api/TimingsApi/TimingClientApi'), limit);
router.use('/timings', require('./api/TimingsApi/TimingClientApi'), limit);

router.use('/auth', require('./api/AuthApi'));

module.exports = router;
