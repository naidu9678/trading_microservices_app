const mongoose = require('mongoose');
const config = require('./config');
const createApp = require('./app');
const logger = require('./utils/logger');

const app = createApp();

let server;

async function start() {
  try {
    logger.info('Connecting to MongoDB: %s', config.mongoUri);
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected');

    server = app.listen(config.port, () => {
      logger.info(`trade-viewer listening on port ${config.port}`);
    });
  } catch (err) {
    logger.error('Failed to start service: %o', err);
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('Shutting down...');
  if (server) server.close();
  await mongoose.disconnect();
  logger.info('Shutdown complete');
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
