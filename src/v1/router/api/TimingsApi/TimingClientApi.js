/* eslint-disable max-len */
const { Router } = require('express');
const {
  getTimingByMasjid, getTimingById, getTimingByDate, getTimingByStartRange, getTimingByDateRange, getDatesByStartRange
} = require('../../../controllers/TimingController');

const TimingsApi = new Router();

// Get the timings of a masjid.
TimingsApi.get('/getTimingByMasjid/:masjidId', getTimingByMasjid);

// Get the timings by Id.
TimingsApi.get('/getTimingById/:timingId', getTimingById);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDate/:masjidId', getTimingByDate);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByStartRange/:masjidId', getTimingByStartRange);

// Get the timings of a masjid.
TimingsApi.get('/getDatesByStartRange/:masjidId', getDatesByStartRange);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDateRange/:masjidId', getTimingByDateRange);

module.exports = TimingsApi;
