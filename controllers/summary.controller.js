const db = require("../config/config.mysql.report.js");
const { getBatchReportQueryObj } = require("./reporting.form.controller.js")
const { getBatchDetails } = require("./report.controller.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { get } = require("http");


// dropdown forms controllers

async function getRecipeIdsBtDateTime(params) {
    const [row] = await db.query(`
    SELECT DISTINCT recipe_id AS BATCH_NAME
    FROM report_batch_details
    WHERE DTTM BETWEEN ? AND ? 
    ORDER BY recipe_id ASC;`, [params.dttmFrom, params.dttmTo]);
    if (row.length === 0) {
        return {};
    }
    return row.map(item => item.BATCH_NAME);
}

async function getSerialByBatchFromSummary(params) {
    if (!params.batch_name || params.batch_name.toLowerCase() === "all") {
        const [rows] = await db.query(`
            SELECT DISTINCT serial_no AS SERIAL_NO
            FROM report_batch_details
            WHERE DTTM BETWEEN ? AND ?
            ORDER BY serial_no ASC;`, [params.from, params.to]);

        if (rows.length === 0) {
            return rows;
        }

        let result = rows.map(item => item.SERIAL_NO);
        // console.log(result);
        return result;

    }
    else {
        const [rows] = await db.query(`
            SELECT DISTINCT serial_no AS SERIAL_NO
            FROM report_batch_details
            WHERE DTTM BETWEEN ? AND ? AND recipe_id = ?
            ORDER BY serial_no ASC;`, [params.from, params.to, params.batch_name]);
        if (rows.length === 0) {
            return rows;
        }
        return rows.map(item => item.SERIAL_NO);
    }

}
// summary data controllers
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

async function getSummaryData(params) {
    try {
        const queryObj = await getBatchReportQueryObj(params);
        // console.log("Query Object:", queryObj);
        // this is missing now

        const summary_data = [];

        for (const row of queryObj) {
            // console.log("Processing row:", row);
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

            const [summaryData] = await db.query(`
                SELECT oil_time,oil_temp, oil_feed, cb_time, bwb
                FROM report_summery
                WHERE batch_no = ? AND recipe_id = ? AND serial_no = ? 
                LIMIT 1;`, [row.batch_no, row.recipe_id, row.serial_no]);

            const summary_row = {
                ...(material_data || {}),
                ...(batch_data || {}),
                ...(summaryData[0] || {})
            }
            // console.log("Summary Row:", summary_row);
            summary_data.push(summary_row);
        }
        return summary_data;
    } catch (error) {
        return error;
    }
}

//summary excel report controllers

async function generateSummaryExcelReport(params) {
    try {
        const summaryData = await getSummaryData(params);
        // console.log("Summary Data :", summaryData);
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "CEAT Mixer RMS";
        workbook.created = new Date();
        workbook.modified = new Date();
        const sheet = workbook.addWorksheet('Summary Report');

        if (summaryData.length === 0) {
            const err = new Error("No data found to generate the summary report for the given parameters");
            err.code = "NO_DATA";
            throw err;
        }
        // console.log("Summary Data :", summaryData);
        // Add header rows
        sheet.columns = [
            { header: "Date", key: "date", width: 15 },                         //1
            { header: "Time", key: "time", width: 10 },                         //2
            { header: "Recipe ID", key: "recipe_id", width: 15 },               //3
            { header: "Serial No", key: "serial_no", width: 15 },               //4
            { header: "Batch No", key: "batch_no", width: 15 },                 //5
            { header: "Used Time", key: "used_time", width: 15 },               //6
            { header: "Discharge Time", key: "discharge_time", width: 12 },     //7
            { header: "Discharge Temp", key: "discharge_temp", width: 12 },     //8
            { header: "Discharge Power", key: "discharge_power", width: 12 },   //9
            { header: "Discharge Energy", key: "discharge_energy", width: 15 }, //10
            { header: "Oil Time", key: "oil_time", width: 15 },                 //11
            { header: "Oil Temp", key: "oil_temp", width: 15 },                 //12
            { header: "Oil Feed", key: "oil_feed", width: 15 },                 //13
            { header: "CB Time", key: "cb_time", width: 15 },                   //14
            { header: "Mixer Mode", key: "mixer_mode", width: 15 },             //15
            { header: "BWB", key: "bwb", width: 15 },

            // --- MATERIALS (UPDATED KEYS) ---
            //CB
            { header: "CB1 Name", key: "CB1_name", width: 15 },
            { header: "CB1 Act", key: "CB1_wt", width: 15 },
            //OIL
            { header: "Oil 2 Name", key: "OIL2_name", width: 15 },
            { header: "Oil 2 Act", key: "OIL2_wt", width: 15 },
            { header: "Oil 1 Name", key: "OIL1_name", width: 15 },
            { header: "Oil 1 Act", key: "OIL1_wt", width: 15 },
            //poly
            { header: "Poly 1 Name", key: "POLY1_name", width: 15 },
            { header: "Poly 1 Act", key: "POLY1_wt", width: 15 },
            { header: "Poly 2 Name", key: "POLY2_name", width: 15 },
            { header: "Poly 2 Act", key: "POLY2_wt", width: 15 },
            { header: "Poly 3 Name", key: "POLY3_name", width: 15 },
            { header: "Poly 3 Act", key: "POLY3_wt", width: 15 },
            { header: "Poly 4 Name", key: "POLY4_name", width: 15 },
            { header: "Poly 4 Act", key: "POLY4_wt", width: 15 },
            { header: "Poly 5 Name", key: "POLY5_name", width: 15 },
            { header: "Poly 5 Act", key: "POLY5_wt", width: 15 },
            { header: "Poly 6 Name", key: "POLY6_name", width: 15 },
            { header: "Poly 6 Act", key: "POLY6_wt", width: 15 },
            //silica
            { header: "Silica Name", key: "PD1_name", width: 15 },
            { header: "Silica Act", key: "PD1_wt", width: 15 },
        ]

        //add heading style
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Summary Report from ${params.dttmFrom} to ${params.dttmTo} `]);

        sheet.getCell("A1").font = { size: 16, bold: true };
        sheet.getCell("A1").alignment = { horizontal: "center" };
        sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };

        sheet.getCell("A2").font = { size: 14, bold: true };
        sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
        sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };
        sheet.mergeCells('A1:P1');
        sheet.mergeCells('A2:P2');


        summaryData.forEach(data => {
            const dttmString = data.DTTM ? new Date(data.DTTM).toISOString().replace("T", " ").slice(0, 19) : "";
            sheet.addRow({
                date: dttmString ? dttmString.split(" ")[0] : "",
                time: dttmString ? dttmString.split(" ")[1] : "",
                recipe_id: data.recipe_id || "",
                serial_no: data.serial_no || "",
                batch_no: data.batch_no || "",
                used_time: data.used_time || "0",
                discharge_time: data.dis_time || "0",
                discharge_temp: data.dis_temp || "0",
                discharge_power: data.dis_power || "0",
                discharge_energy: data.dis_energy || "0",
                oil_time: data.oil_time || "0",
                oil_temp: data.oil_temp || "0",
                oil_feed: data.oil_feed || "0",
                cb_time: data.cb_time || "0",
                mixer_mode: data.mode || "0",
                bwb: data.bwb || "0",

                // MATERIALS (UPPERCASE KEYS)
                CB1_name: data.CB1_name || "",
                CB1_wt: data.CB1_wt || "",

                OIL2_name: data.OIL2_name || "",
                OIL2_wt: data.OIL2_wt || "",

                OIL1_name: data.OIL1_name || "",
                OIL1_wt: data.OIL1_wt || "",

                POLY1_name: data.POLY1_name || "",
                POLY1_wt: data.POLY1_wt || "",

                POLY2_name: data.POLY2_name || "",
                POLY2_wt: data.POLY2_wt || "",

                POLY3_name: data.POLY3_name || "",
                POLY3_wt: data.POLY3_wt || "",

                POLY4_name: data.POLY4_name || "",
                POLY4_wt: data.POLY4_wt || "",

                POLY5_name: data.POLY5_name || "",
                POLY5_wt: data.POLY5_wt || "",

                POLY6_name: data.POLY6_name || "",
                POLY6_wt: data.POLY6_wt || "",

                PD1_name: data.PD1_name || "",
                PD1_wt: data.PD1_wt || ""
            });
        });

        sheet.getRow(3).alignment = { wrapText: true };
        sheet.getRow(3).font = { bold: true };

        sheet.insertRow(3, []); // Empty row after header

        sheet.mergeCells('A3:E3'); // Merge header cells for title
        sheet.getCell('A3').alignment = { horizontal: 'center' };
        sheet.getCell('A3').value = "Avarage"


        // Function to convert column number to letter
        function getColumnLetter(colNum) {
            let letter = "";
            while (colNum > 0) {
                const mod = (colNum - 1) % 26;
                letter = String.fromCharCode(65 + mod) + letter;
                colNum = Math.floor((colNum - mod) / 26);
            }
            return letter;
        }

        // Apply AVG formulas to row 3 for columns F → AJ (6 → 36)
        for (let col = 6; col <= 36; col++) {
            const colLetter = getColumnLetter(col);
            sheet.getCell(`${colLetter}3`).value = {
                formula: `AVERAGE(${colLetter}5:${colLetter}${sheet.rowCount})`
            };
        }
        // Apply red font color to the average row
        sheet.getRow(3).eachCell((cell) => {
            cell.font = { color: { argb: "FFFF0000" }, bold: true };
        });

        // Apply auto-filter to the data range
        sheet.autoFilter = {
            from: 'A4',
            to: 'AJ4',
        }

        //Apply border to data cells
        sheet.eachRow(row => {
            row.eachCell(cell => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                    bottom: { style: "thin" }
                };
            })
        });


        // STEP 3 → Save Workbook to File
        const reportsDir = path.join(__dirname, "..", "reports", "summary");
        // Ensure reports directory exists
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }
        const filePath = path.join(reportsDir, `Production_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
        await workbook.xlsx.writeFile(filePath);
        return { status: true, filePath };

    } catch (error) {
        return {
            status: false,
            errLocation: "In summary.controller.js ,At function call generateSummeryExcelReport()",
            params,
            error
        }
    }
}

// generateSummaryExcelReport({
//     dttmFrom: "2025-12-01 00:00:00",
//     dttmTo: "2025-12-11 23:59:59",
//     recipeId: "All",
//     serialNo: "All",
//     batchNo: "All"
// }).then(data => {
//     // console.dir(data, { depth: null, colors: true });
// }).catch(err => {
//     // console.error(err);
// })

module.exports = {
    generateSummaryExcelReport,
    getRecipeIdsBtDateTime,
    getSerialByBatchFromSummary,
};