const mysql=require('mysql2/promise');
require('dotenv').config();

const report_pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'nodejs',
    password: process.env.DB_PASSWORD || '1234',
    database:  'ceat_mixer_report',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    timezone: '+05:30',
});
module.exports = report_pool;