const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/config.swagger.js"); // <-- your swagger config
const recipeRoutes = require('./routes/recipe.routes.js');
const materialRoutes = require('./routes/material.routes.js');
const reportRoutes = require('./routes/report.routes.js');
const loggingMiddleware = require('./middleware/middleware.logger.js');
const myData = require("./recipe_structure.json");
const logger = require('./config/config.logger.js');
const recipeFormat = require('./recipe_final.json')
const app = express();


const port = process.env.PORT || 3000;


// Enable CORS for all requests
app.use(cors());

app.use(loggingMiddleware);


// Parse JSON and urlencoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/recipeFormat', (req, res) => {
    res.status(200).json(recipeFormat)
}); 

app.use('/recipe', recipeRoutes);
app.use('/material', materialRoutes);
app.use('/report', reportRoutes);

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

// 👉 Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
