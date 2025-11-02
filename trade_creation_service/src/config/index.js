require('dotenv').config();
const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'production',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/tradingdb',
  logLevel: process.env.LOG_LEVEL || 'info',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
};
module.exports = config;
