const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.buyTicket = async (req, res) => {
  try {
    const { eventId, userId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (event.ticketsAvailable < quantity) return res.status(400).json({ error: 'Not enough tickets available' });

    event.ticketsAvailable -= quantity;
    await event.save();

    const ticket = new Ticket({ event: eventId, user: userId, quantity });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.params.userId }).populate('event');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

