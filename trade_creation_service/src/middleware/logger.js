const morgan = require('morgan');
const logger = require('../utils/logger');

const stream = {
  write: (message) => logger.info(message.trim())
};

const skip = () => false;

const httpLogger = morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream, skip });

module.exports = httpLogger;
