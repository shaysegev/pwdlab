const { createLogger, format, transports } = require('winston');

var logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [
    new transports.File({ filename: './combined.log', timestamp: true, maxsize: 1000000}),
    new transports.Console()
  ]
});

if (process.env.NODE_ENV === 'production') {
  // Logging exceptions and errors
  logger.exitOnError = false;
  logger.exceptions.handle(
    new transports.File({ filename: './exceptions.log', timestamp: true, maxsize: 1000000}),
    new transports.Console()
  );
}

module.exports = logger;