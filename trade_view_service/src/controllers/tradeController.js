const Trade = require('../models/Trade');
const logger = require('../utils/logger');

async function listTrades(req, res, next) {
  try {
    const { page = 1, limit = 20, symbol, trader, status, sortBy = '-createdAt' } = req.query;
    const query = {};
    if (symbol) query.symbol = symbol.toUpperCase();
    if (trader) query.trader = trader;
    if (status) query.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const trades = await Trade.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit, 10))
      .lean();

    const total = await Trade.countDocuments(query);

    res.json({
      data: trades,
      meta: {
        total,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getTrade(req, res, next) {
  try {
    const { id } = req.params;
    const trade = await Trade.findOne({ tradeId: id }).lean();
    if (!trade) {
      const err = new Error('Trade not found');
      err.status = 404;
      return next(err);
    }
    res.json({ data: trade });
  } catch (err) {
    next(err);
  }
}

module.exports = { listTrades, getTrade };
