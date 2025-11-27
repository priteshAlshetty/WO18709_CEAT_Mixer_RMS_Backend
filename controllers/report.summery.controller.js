const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");



async function getSummeryData(params) {

    try {
        //STEP 1 → Query Data
    } catch (error) {
        return ({ status: false, error });
    }
}

async function getMaterialData(params) {
    try {

        const [rows] = await db.query(/* sql */
            `
            SELECT material_code,  act_wt, material_type
            FROM report_material_log
            WHERE recipe_id = ? AND serial_no = ? AND batch_no = ? 
            ORDER BY material_type;
            `,
            [params.recipe_id, params.serial_no, params.batch_no]
        );
        if (rows.length === 0) {
            {
                // console.error("❌ No data for the given date range.");
                const err = new Error("NO_DATA");
                err.code = "NO_DATA";
                err.message = "No data for the given date range.";
                throw err;
            }
        }

        const MATERIAL_LIST = [
            "POLY 1", "POLY 2", "POLY 3", "POLY 4", "POLY 5", "POLY 6",
            "CB 1",
            "OIL1", "OIL2",
            "PD 1",
            "FL1"
        ];

        const flattenedRows = {};

        // convert rows into fast lookup by material_code
        const map = {};
        for (const row of rows) {
            map[row.material_type.trim()] = row;
        }

        for (const item of MATERIAL_LIST) {
            const found = map[item] || null;

            // add name key
            flattenedRows[`${item} name`] = found ? item : "";

            // add act_wt key
            flattenedRows[`${item} act_wt`] = found ? found.act_wt : 0;
        }

        return ({ status: true, data: flattenedRows });
    } catch (error) {

        return ({ status: false, error });
    }

}

getMaterialData({ recipe_id: "ML611", serial_no: 2049, batch_no: 15 }).then(result => {
    console.dir(result, { depth: null, colors: true });
});