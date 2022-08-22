/* eslint-disable max-len */
const { Router } = require('express');
const {
  addTiming, deleteNamaz, updateTiming, deleteTiming, updateNamaz,
} = require('../../../controllers/TimingController');

const TimingsApi = new Router();

// Add new Timings
TimingsApi.post('/addTiming', addTiming);

// Update Timings
TimingsApi.put('/updateTiming/:timingId', updateTiming);

// Update Namaz
TimingsApi.put('/updateNamaz/:id', updateNamaz);

// Delete Namaz
TimingsApi.put('/deleteNamaz/:id', deleteNamaz);

// Delete Timings
TimingsApi.delete('/deleteTiming/:timingId', deleteTiming);

module.exports = TimingsApi;
