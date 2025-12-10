const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { getMySQLTimestamp } = require("../utils/timestamp.helper.js");
const { get } = require("http");

async function getDowntime(params) {
    const from = getMySQLTimestamp(new Date(params.from));
    const to = getMySQLTimestamp(new Date(params.to));
    try {
        // STEP 1 → Query Data
        const [rows] = await db.query(`
            SELECT *,TIMESTAMPDIFF(SECOND, downtime_start, downtime_stop) AS total_downtime
            FROM report_downtime 
            WHERE DTTM BETWEEN ? AND ? 
            ORDER BY sr ASC;`, [from, to]);

        if (rows.length === 0) {
            {
                // console.error("❌ No data for the given date range.");
                const err = new Error("NO_DATA");
                err.code = "NO_DATA";
                err.message = "No data for the given date range.";
                throw err;
            }
        }
        rows.forEach(item => {
            item.downtime_start = getMySQLTimestamp(new Date(item.downtime_start));
            item.downtime_stop = getMySQLTimestamp(new Date(item.downtime_stop));
        });
        return { status: true, downtime_data: rows };
    } catch (error) {
        return { status: false, error };
    }

}
async function updateDowntime(params) {
    try {
        const downtime_data = params.downtime_data;
        let lastResult = null;
        let affectedRows = 0;
        for (const item of downtime_data) {
            const [result] = await db.query(
                `UPDATE report_downtime SET
                    error_code = ?,
                    category = ?,
                    sub_category = ?,
                    description = ?
                    WHERE sr = ?`,
                [
                    item.error_code,
                    item.category,
                    item.sub_category,
                    item.description,
                    item.sr
                ]
            );

            lastResult = result;
            affectedRows += result.affectedRows;
            if (result.affectedRows === 0) {
                return { status: false, message: `No row updated for sr ${item.sr}`, affectedRows };
            }
        }

        return { status: true, result: lastResult, affectedRows };

    } catch (error) {
        return { status: false, error };
    }
}





module.exports = {
    getDowntime,
    updateDowntime
};

