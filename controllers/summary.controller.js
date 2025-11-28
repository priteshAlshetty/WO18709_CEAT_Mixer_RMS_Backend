const db = require("../config/config.mysql.report.js");
const { getBatchReportQueryObj } = require("./reporting.form.controller.js")
const { getBatchDetails } = require("./report.controller.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { get } = require("http");




async function getMatrialByBatchNo(params) {

    try {
        // STEP 1 → Query Data

        const [rows] = await db.query(
            `
            SELECT material_code, material_type,act_wt
            FROM report_material_log
            WHERE batch_no = ? AND recipe_id = ? AND serial_no = ? 
            ORDER BY DTTM ASC; `, [params.batch_no, params.recipe_id, params.serial_no]);

        if (rows.length === 0) {
            return {};
        }
        // STEP 2 → Prepare Result
        const result = {};
        let polyCount = 1, cbCount = 1, oilCount = 1, pdCount = 1, flCount = 1;
        rows.forEach(row => {
            if (row.material_type === "POLY") {
                result[`${row.material_type}${polyCount}_name`] = row.material_code;
                result[`${row.material_type}${polyCount}_wt`] = row.act_wt;
                polyCount++;
            } else if (row.material_type === "CB") {
                result[`${row.material_type}${cbCount}_name`] = row.material_code;
                result[`${row.material_type}${cbCount}_wt`] = row.act_wt;
                cbCount++;
            } else if (row.material_type === "OIL") {
                result[`${row.material_type}${oilCount}_name`] = row.material_code;
                result[`${row.material_type}${oilCount}_wt`] = row.act_wt;
                oilCount++;
            } else if (row.material_type === "PD") {
                result[`${row.material_type}${pdCount}_name`] = row.material_code;
                result[`${row.material_type}${pdCount}_wt`] = row.act_wt;
                pdCount++;
            } else if (row.material_type === "FL") {
                result[`${row.material_type}${flCount}_name`] = row.material_code;
                result[`${row.material_type}${flCount}_wt`] = row.act_wt;
                flCount++;
            }
            else {
                result[`${row.material_type}_name`] = row.material_code;
                result[`${row.material_type}_wt`] = row.act_wt;
            }
        });

        return result;
    } catch (error) {
        throw error;
    }
}

async function getSummeryData(params) {
    try {
        const queryObj = await getBatchReportQueryObj(params);
        // console.log("Query Object:", queryObj);
        const summery_data = [];
        for (const row of queryObj) {
            console.log("Processing row:", row);
            const material_data = await getMatrialByBatchNo({
                batch_no: row.batch_no,
                recipe_id: row.recipe_id,
                serial_no: row.serial_no
            });
            // console.log("Material Data:", material_data);

            const batch_data = await getBatchDetails({
                batch_no: row.batch_no,
                recipe_id: row.recipe_id,
                serial_no: row.serial_no
            });

            const [summary_data] = await db.query(`
                SELECT oil_time,oil_temp, oil_feed, cb_time, bwb
                FROM report_summery
                WHERE batch_no = ? AND recipe_id = ? AND serial_no = ? 
                LIMIT 1;`, [row.batch_no, row.recipe_id, row.serial_no]);

            const summery_row = {
                ...(material_data || {}),
                ...(batch_data || {}),
                ...(summary_data[0] || {})
            }
            // console.log("Summery Row:", summery_row);
            summery_data.push(summery_row);
        }
        return summery_data;
    } catch (error) {
        return error;
    }
}


getSummeryData({
    recipeId: "All",
    serialNo: "All",
    batchNo: "All",
    dttmFrom: "2025-11-18",
    dttmTo: "2025-11-19"
}).then(result => {
    console.dir(result, { depth: null, colors: true });
}).catch(err => {
    console.error("🔥 Error in getSummeryData:", err);
});

module.exports = {
    getSummeryData
};