/* eslint-disable max-len */
const { Router } = require('express');
const {
  getTimingByMasjid, getTimingById, getTimingByDateRange, getTimingByDate,
} = require('../../../controllers/TimingController');

const TimingsApi = new Router();

// Get the timings of a masjid.
TimingsApi.get('/getTimingByMasjid/:masjidId', getTimingByMasjid);

// Get the timings by Id.
TimingsApi.get('/getTimingById/:timingId', getTimingById);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDate', getTimingByDate);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDateRange/:masjidId', getTimingByDateRange);

module.exports = TimingsApi;
