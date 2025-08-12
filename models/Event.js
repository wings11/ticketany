const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  price: { type: Number, required: true },
  ticketsAvailable: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
