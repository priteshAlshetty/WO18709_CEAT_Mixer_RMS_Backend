const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    password: '1234',
    database: 'ceat_mixer3_report',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    timezone: '+05:30',
});
async function logData(params) {

    const [result] = await pool.query(`INSERT INTO operator_log(DTTM, log_id, user_name, log_desc, mixer_id) VALUES ( ?, ?, ?, ?, ?)`, [params.DTTM, params.log_id, params.user_name, params.log_desc, params.mixer_id]);

    if (result.affectedRows > 0) {
        return true;
    }
    else {
        return false;
    }
}
module.exports = {
    logData
};
