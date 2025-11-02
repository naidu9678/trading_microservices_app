// src/models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  tradeId: { type: String, required: true, unique: true },
  symbol: { type: String, required: true },
  type: { type: String, required: true }, // BUY or SELL
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  trader: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
