const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error('Error: %o', { message: err.message, stack: err.stack });
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      details: err.details || undefined
    }
  });
}

module.exports = errorHandler;
