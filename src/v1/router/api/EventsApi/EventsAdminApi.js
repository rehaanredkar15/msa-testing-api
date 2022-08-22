const { Router } = require('express');
const {
  addEvent, updateEvent, deleteEvent,
} = require('../../../controllers/EventController');

const EventsApi = new Router();

// Add new Event
EventsApi.post('/addEvent', addEvent);

// Update an Event
EventsApi.put('/updateEvent/:id', updateEvent);

// Delete an Event
EventsApi.delete('/deleteEvent/:id', deleteEvent);

module.exports = EventsApi;
