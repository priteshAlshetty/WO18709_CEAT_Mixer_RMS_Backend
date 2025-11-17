const db = require("../config/config.mysql.report.js");
const { generateExcelBatchReport } = require("./report.controller.js");
const path = require("path");

async function getBatchNameByDate(from, to) {
    const query = `SELECT DISTINCT recipe_id AS BATCH_NAME
                    FROM report_batch_details
                    WHERE DATE(DTTM) BETWEEN ? AND ? `;
    const [rows] = await db.query(query, [from, to]);

    if (rows.length > 0) {
        return rows.map(row => row.BATCH_NAME);
    } else {
        return null;
    }
}

async function getSerialByBatchName(batchName, from, to) {

    const placeholders = batchName.map(() => "?").join(","); // Create placeholders for the IN clause
    const query = `
        SELECT DISTINCT serial_no AS SERIAL_NO
        FROM report_batch_details
        WHERE DATE(DTTM) BETWEEN ? AND ?
        AND recipe_id IN (${placeholders})
        ORDER BY serial_no ASC
    `;
    const queryParams = [from, to, ...batchName];

    const [rows] = await db.query(query, queryParams);

    if (rows.length > 0) {
        return rows.map(row => row.SERIAL_NO);
    } else {
        return null;
    }
}

async function getBatchNoBySerialNo(serialNo) {
    const query = `SELECT DISTINCT batch_no AS BATCH_NO
                    FROM report_batch_details
                    WHERE serial_no = ? `;
    const [rows] = await db.query(query, [serialNo]);

    if (rows.length > 0) {
        return rows.map(row => row.BATCH_NO);
    } else {
        return null;
    }
}

async function getBatchReportQueryObj(params) {
    let queryObj;

    try {
        const recipeId = params.recipeId;
        const serialNo = params.serialNo;
        const batchNo = params.batchNo;
        const dttmFrom = params.dttmFrom;
        const dttmTo = params.dttmTo;
        // console.log("Parameters Received:", { recipeId, serialNo, batchNo, dttmFrom, dttmTo });
        if (recipeId === "All") {

            const [rows] = await db.query(`
                SELECT DISTINCT serial_no, batch_no, recipe_id
                FROM report_batch_details
                WHERE DTTM BETWEEN ? AND ?
                ORDER BY serial_no ASC, batch_no ASC
            `, [dttmFrom, dttmTo]);

            if (!rows || rows.length === 0) {
                throw new Error("No data found for the given date range");

            } else {
                return rows;
            }
        }
        else if (serialNo === "All") {
            const [rows] = await db.query(`
                SELECT DISTINCT serial_no, batch_no, recipe_id
                FROM report_batch_details
                WHERE recipe_id =? AND  DTTM BETWEEN ? AND ? 
                ORDER BY serial_no ASC, batch_no ASC
            `, [recipeId, dttmFrom, dttmTo]);

            if (!rows || rows.length === 0) {
                throw new Error("No data found for the given date range");

            } else {
                return rows;
            }

        }
        else if (batchNo === "All") {

            const [rows] = await db.query(`
                SELECT DISTINCT serial_no, batch_no, recipe_id
                FROM report_batch_details
                WHERE recipe_id =? AND serial_no = ? AND DTTM BETWEEN ? AND ?
                ORDER BY serial_no ASC, batch_no ASC
            `, [recipeId, serialNo, dttmFrom, dttmTo]);

            if (!rows || rows.length === 0) {
                throw new Error("No data found for the given date range");

            } else {
                return rows;
            }

        }
        else {
            queryObj = [{
                recipe_id: recipeId,
                serial_no: serialNo,
                batch_no: batchNo,
            }]
        }

        return queryObj;
    } catch (error) {
        console.error("🔥 Error in getExcelBatchReport:", error);
        throw error;
    }
    // get report path
    // const reportPath = path.join(__dirname, '..', 'reports', 'batch_reports', 'Batch_Report_Template.xlsx');
    // return {queryObj, reportPath};
}

async function getExcelBatchReport(obj) {
    try {
        const queryObj = await getBatchReportQueryObj(obj);
        // console.log("Query Object:", queryObj);
        const reportFilePath = await generateExcelBatchReport(queryObj);
        if (!reportFilePath) {
            throw new Error("Failed to generate report");
        }
        return reportFilePath;
    } catch (error) {
        console.error("🔥 Error in getExcelBatchReport:", error);

    }
}
module.exports = {
    getBatchNameByDate,
    getSerialByBatchName,
    getBatchNoBySerialNo,
    getExcelBatchReport
};
