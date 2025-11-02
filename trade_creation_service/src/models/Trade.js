const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  tradeId: { type: String, required: true, index: true, unique: true },
  symbol: { type: String, required: true, uppercase: true, index: true },
  type: { type: String, enum: ['BUY', 'SELL'], required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  trader: { type: String, required: true }, // trader id / name
  status: { type: String, enum: ['NEW', 'FILLED', 'CANCELLED'], default: 'NEW' },
  meta: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);
