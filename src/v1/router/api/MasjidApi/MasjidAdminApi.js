/* eslint-disable max-len */
const { Router } = require('express');
const {
  addMasjid, updateMasjid, deleteMasjid,
} = require('../../../controllers/MasjidController');

const MasjidApi = new Router();

// Add new Masjid
MasjidApi.post('/addMasjid', addMasjid);

// Update Masjid
MasjidApi.put('/updateMasjid/:id', updateMasjid);

// Delete Masjid
MasjidApi.delete('/deleteMasjid/:id', deleteMasjid);

module.exports = MasjidApi;
