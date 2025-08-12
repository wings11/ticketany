const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Add new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
