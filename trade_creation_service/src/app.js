const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const tradesRoute = require('./routes/trades');
const errorHandler = require('./middleware/errorHandler');
const httpLogger = require('./middleware/logger');
const config = require('./config');
const logger = require('./utils/logger');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(httpLogger);

  const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax
  });
  app.use(limiter);

  app.use('/api/trades', tradesRoute);

  app.get('/health', (req, res) => res.json({ status: 'ok', service: 'trade-creator' }));

  app.use(errorHandler);

  // basic 404
  app.use((req, res) => res.status(404).json({ error: 'Not found' }));

  return app;
}

module.exports = createApp;
