const db = require("../../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
// const { getMySQLTimestamp } = require("../../utils/timestamp.helper.js");

function getMySQLTimestamp(utcInput) {
    /**
 * Converts UTC ISO timestamp to IST MySQL DATETIME
 * @param {string|Date} utcInput - '2026-01-01T02:30:10.000Z'
 * @returns {string} '2026-01-01 08:00:10'
 */
    const date = utcInput instanceof Date
        ? utcInput
        : new Date(utcInput);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid UTC timestamp');
    }

    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const parts = formatter.formatToParts(date);
    const map = Object.fromEntries(parts.map(p => [p.type, p.value]));

    return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`

}


/**
 * Get distinct recipe IDs from `report_graph` between two datetimes.
 * Accepts Date objects or date strings for `from` and `to`.
 * Returns a consistent object with `status` and `recipe_id` array, or `status:false` and `error` on failure.
 */
async function getRecipeIdByDate(param = {}) {
    try {
        if (!param.from || !param.to) {
            return { status: false, error: 'Missing required "from" or "to" parameter' };
        }


        const from = getMySQLTimestamp(param.from);
        const to = getMySQLTimestamp(param.to);

        // exclude NULL recipe_id directly in SQL and return the ID list
        const sql = "SELECT DISTINCT recipe_id FROM report_graph WHERE DTTM BETWEEN ? AND ? AND recipe_id IS NOT NULL ORDER BY DTTM ASC;";
        const [rows] = await db.query(sql, [from, to]);

        if (rows.length === 0) { return { status: false, error: "NO_DATA" } }
        const recipe_id = rows.map(r => r.recipe_id);

        return { status: true, recipe_id };
    } catch (error) {
        console.error("Error at getRecipeIdByDate function call:", error);
        return { status: false, error };
    }
}

async function getSrNoByRecipeId(param = {}) {
    try {
        if (!param.recipe_id || !param.from || !param.to) return { status: false, error: 'Missing recipe_id/from/to' };

        const from = getMySQLTimestamp(param.from);
        const to = getMySQLTimestamp([param.to]);

        const sql = "SELECT DISTINCT sr_no FROM report_graph WHERE recipe_id = ? AND DTTM BETWEEN ? AND ? AND sr_no IS NOT NULL ORDER BY DTTM ASC;";

        const [rows] = await db.query(sql, [param.recipe_id, from, to]);

        if (rows.length === 0) {
            return {
                status: false,
                error: "NO_DATA"
            }
        }

        const sr_no = rows.map(r => r.sr_no);
        return { status: true, sr_no };

    } catch (error) {
        console.error("Error at getSrNoByRecipeId():", error);
        return { status: false, error: error.message || error };
    }
}

async function getBatchCountBySrno(param = {}) {
    try {
        if (!param.sr_no) return { status: false, error: 'Missing sr_no' };

        // get the latest non-null set_batch for the provided sr_no
        const sql = "SELECT set_batch FROM report_graph WHERE sr_no = ? AND set_batch IS NOT NULL ORDER BY DTTM DESC LIMIT 1;";
        const [rows] = await db.query(sql, [param.sr_no]);

        if (!rows || rows.length === 0) return { status: false, error: 'No data' };

        const set_batch = rows[0].set_batch;
        return { status: true, set_batch };
    } catch (error) {
        console.error("Error at getBatchCountBySrno() func call :", error);
        return { status: false, error: error.message || error };
    }
}

async function getGraphDataByBatchNo(param = {}) {
    try {
        let { sr_no, batch_no, from, to } = param;
        if (!sr_no || !batch_no || !from || !to) {
            return {
                status: false,
                error: "INVALID_PARAMETERS"
            };
        }
        const sql = "SELECT * FROM report_graph WHERE sr_no = ? AND batch_no = ? and DTTM BETWEEN ? AND ? ORDER BY DTTM ASC"

        from = getMySQLTimestamp(param.from);
        to = getMySQLTimestamp(param.to);

        let temp = [];
        let power = [];
        let energy = [];
        let pressure = [];
        let rpm = [];
        let ram_position = [];
        let DD_Open = [];

        const [rows] = await db.query(sql, [
            sr_no,
            batch_no,
            from,
            to
        ]);

        if (rows.length === 0) {
            return {
                status: false,
                error: "NO_DATA"
            };
        }

        for (const row of rows) {
            temp.push(row.temp);
            power.push(row.power);
            energy.push(row.energy);
            pressure.push(row.pressure);
            rpm.push(row.rpm);
            ram_position.push(row.ram_position);
            DD_Open.push(row.DD_Open);
        }

        return {
            status: true,
            meta: {
                sr_no: rows[0].sr_no,
                recipe_id: rows[0].recipe_id,
                batch_no: rows[0].batch_no,
                begin_time: getMySQLTimestamp(rows[0].DTTM),
                end_time: getMySQLTimestamp(rows[rows.length - 1].DTTM),
                resolution: rows.length
            },
            graphData: {
                temp,
                power,
                energy,
                pressure,
                rpm,
                ram_position,
                DD_Open
            }
        };
    } catch (error) {
        console.error("Error at try catch block of function call getGraphDataByBatchNo(): ", error);
        return {
            status: false,
            error,
            graphData: {
            }
        }
    }

}

module.exports = {
    getRecipeIdByDate,
    getSrNoByRecipeId,
    getBatchCountBySrno,
    getGraphDataByBatchNo
}