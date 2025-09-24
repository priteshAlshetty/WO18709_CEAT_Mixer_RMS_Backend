const winston = require('winston');
const path = require('path');

// Define custom log format
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        // Convert message and meta to single line JSON
        const metaStr = Object.keys(meta).length 
            ? JSON.stringify(meta)
            : '';
        const msg = typeof message === 'object' 
            ? JSON.stringify(message)
            : message;
        return `${timestamp} [${level.toUpperCase()}]: ${msg} ${metaStr}`.trim();
    })
);

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        // Separate error logging
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/error.log'),
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // File logging - general info
        new winston.transports.File({
            filename: path.join(__dirname, '../logs/app.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        // Console logging for development
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        })
    ],
    // Don't exit on handled exceptions
    exitOnError: false
});

module.exports = logger;