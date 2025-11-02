const Trade = require('../models/Trade');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

async function createTrade(req, res, next) {
  try {
    const body = req.validatedBody || req.body;
    const trade = new Trade({
      tradeId: body.tradeId || `T-${Date.now()}-${uuidv4().split('-')[0]}`,
      symbol: body.symbol,
      type: body.type,
      quantity: body.quantity,
      price: body.price,
      trader: body.trader,
      status: body.status || 'NEW',
      meta: body.meta || {}
    });
    await trade.save();
    logger.info('Trade created: %s', trade.tradeId);
    res.status(201).json({ data: trade });
  } catch (err) {
    // handle duplicate key
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Trade conflict: tradeId must be unique';
    }
    next(err);
  }
}

module.exports = { createTrade };
