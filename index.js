const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const recipeRoutes = require('./routes/recipe.routes.js');
const myData = require("./recipe_structure.json");
const loggingMiddleware = require('./middleware/middleware.logger.js');
const logger = require('./config/config.logger.js');


// Enable CORS for all requests
app.use(cors());

app.use(loggingMiddleware);


// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/recipe', recipeRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack
    });
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

// Create server instance
const server = app.listen(port, '0.0.0.0', () => {
    logger.info(`RMS backend app listening on port ${port}`);
    console.log(`RMS backend app listening on port ${port}`);   
});

// Graceful shutdown handling
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
    logger.info('Received kill signal, shutting down gracefully');
    server.close(() => {
        logger.info('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}
