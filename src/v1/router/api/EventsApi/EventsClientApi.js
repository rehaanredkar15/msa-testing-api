const { Router } = require('express');
const {
  getAllEvents, getNearByEvents, getEventsByMasjid,
} = require('../../../controllers/EventController');

const EventsApi = new Router();

// Get all the events
EventsApi.get('/getAllEvents', getAllEvents);

// Get the events according to the location
EventsApi.post('/getNearByEvents', getNearByEvents);

// Get the events according to the nearby masjids
EventsApi.post('/getEventsByMasjid', getEventsByMasjid);

module.exports = EventsApi;
