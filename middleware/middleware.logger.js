const logger = require('../config/config.logger');

const loggingMiddleware = (req, res, next) => {
    // Log request
    logger.info({
        event: 'request',
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: req.body,
        headers: {
            'user-agent': req.get('user-agent'),
            'content-type': req.get('content-type')
        },
        ip: req.ip
    });

    // Log response
    res.on('finish', () => {
        logger.info({
            event: 'response',
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            statusMessage: res.statusMessage,
            responseTime: Date.now() - req._startTime,
            contentLength: res.get('content-length')
        });
    });

    next();
};

module.exports = loggingMiddleware;