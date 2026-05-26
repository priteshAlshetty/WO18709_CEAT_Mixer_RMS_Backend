require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/config.swagger.js"); // <-- your swagger config
const recipeRoutes = require('./routes/recipe.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const updateUsersRoutes = require('./routes/updateUsers.routes.js');
const materialRoutes = require('./routes/material.routes.js');
const reportRoutes = require('./routes/report.routes.js');
const downtimeRoutes = require('./routes/downtime.route.js');
const graphs = require('./routes/graph.route.js');
const myData = require("./recipe_structure.json");
const logger = require('./config/config.logger.js');
const recipeFormat = require('./recipe_final.json');
const recipeStatus = require('./routes/recipeStatus.routes.js');

const loggingMiddleware = require('./middleware/middleware.logger.js');
const mixerDbMiddleware = require("./middleware/mixerDb.middleware");
const verifyToken = require("./middleware/middleware.auth.js");



const app = express();


const port = 3000;


// Enable CORS for all requests
app.use(cors());

// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/recipeFormat', (req, res) => {
    res.status(200).json(recipeFormat)
});
// 👉 Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use(loggingMiddleware);
app.use(mixerDbMiddleware);
app.use(verifyToken); // Apply auth middleware to all routes below
app.use('/auth', updateUsersRoutes);
app.use('/recipe', recipeRoutes);
app.use('/material', materialRoutes);
app.use('/report', reportRoutes);
app.use('/downtime', downtimeRoutes);
app.use('/graph', graphs);
app.use('/recipeStatus', recipeStatus);


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
    logger.info(`Backend started at ${new Date(Date.now()).toLocaleString()}`);

    console.log(`RMS Mixer123 backend app listening on port ${port}`);
});

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;


// Graceful shutdown handling
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
    logger.info('Received kill signal, shutting down gracefully');
    server.close(async () => {
        logger.info('Closed out remaining connections');
        try {
            const pool1 = require('./config/config.mysql.js');
            const pool2 = require('./config/config.mysql.report.js');
            await pool1.end();
            await pool2.end();
            logger.info('MySQL pool closed');

        } catch (error) {
            logger.error('Error closing MySQL pool', error);
        }
        process.exit(0);
    });

    setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}
process.on('uncaughtException', err => {
    logger.error('Uncaught Exception', {
        message: err.message,
        stack: err.stack
    });
});

process.on('unhandledRejection', err => {
    logger.error('Unhandled Promise Rejection', err);
});