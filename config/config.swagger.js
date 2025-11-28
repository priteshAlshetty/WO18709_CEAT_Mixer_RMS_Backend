// config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Mixer RMS API Docs",
        version: "1.1.0",
        description: "API documentation for Mixer Central RMS project (material + recipe management).",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Development server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/swagger.docs.js"], // where to scan for @swagger comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
