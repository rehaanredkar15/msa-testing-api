/* eslint-disable max-len */
const { Router } = require('express');
const {
  getMasjidById, getAllMasjid, getMasjid, getNearMasjid, getAreaMasjids, getMasjidByAreaSearch,
} = require('../../../controllers/MasjidController');

const MasjidApi = new Router();

// Get all the masjids
MasjidApi.get('/getAllMasjid', getAllMasjid);

// Get all the masjids
MasjidApi.get('/getMasjid/:masjidName', getMasjid);

// Get all the masjids
MasjidApi.get('/getMasjidById/:id', getMasjidById);

// Get all the masjids according to users location
MasjidApi.post('/getNearMasjids', getNearMasjid);

// Get all the masjids according to users location
MasjidApi.post('/getAreaMasjids', getAreaMasjids);

// Get all the masjids according to user  address entered
MasjidApi.get('/getMasjidByAreaSearch/:address', getMasjidByAreaSearch);

module.exports = MasjidApi;
