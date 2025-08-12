const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Buy ticket
router.post('/', ticketController.buyTicket);
router.get('/user/:userId', ticketController.getUserTickets);


module.exports = router;
