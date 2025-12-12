const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");

async function getProductionData(params) {

    try {
        //STEP 1 → Query Data
        const [rows] = await db.query(/* sql */
            `
            SELECT DATE_FORMAT(DTTM, '%Y-%m-%d') AS DTTM ,recipe_id, serial_no, set_batch, batch_no, start_time, stop_time,user_name, TIME(start_time) AS start_time_only, TIME(stop_time) AS stop_time_only
            FROM report_production
            WHERE DATE(DTTM) BETWEEN ? AND ?
            ORDER BY serial_no, recipe_id, batch_no;
            `,
            [params.from, params.to]
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
        //step 2 → calculate cycle time, bWB time
        let previous = null;
        rows.forEach((row, index) => {
            // cycle_time = stop_time - start_time (seconds)
            row.cycle_time = (new Date(row.stop_time) - new Date(row.start_time)) / 1000;

            // First batch for this serial + recipe
            if (!previous || previous.serial_no !== row.serial_no || previous.recipe_id !== row.recipe_id) {
                row.bwb_time = 0;
            } else {
                // bwb_time = start(current) - stop(previous)
                row.bwb_time = (new Date(row.start_time) - new Date(previous.stop_time)) / 1000;
            }
            // Update pointer for next iteration
            previous = row;
        })
        return ({ status: true, data: rows });
    } catch (error) {
        return ({ status: false, error });
    }

}

async function getProductionReport(params) {
    try {
        //get data
        const result = await getProductionData(params);
        if (!result.status) {
            throw result.error;
        }
        // console.dir(result, { depth: null, colors: true });
        const rows = result.data;

        // STEP 2 → Prepare Excel Workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "CEAT Mixer RMS";
        workbook.created = new Date();
        workbook.modified = new Date();
        const sheet = workbook.addWorksheet("Production Report");

        sheet.columns = [
            { header: "Date", key: "date", width: 15 },                         //1
            { header: "Serial No", key: "serial_no", width: 15 },               //2
            { header: "Recipe ID", key: "recipe_id", width: 15 },               //3 
            { header: "Batch No", key: "batch_no", width: 10 },                 //4
            { header: "Set Batch", key: "set_batch", width: 15 },               //5
            { header: "Start Time", key: "start_time", width: 20 },             //6
            { header: "Stop Time", key: "stop_time", width: 20 },               //7
            { header: "Cycle Time (s)", key: "cycle_time", width: 15 },           //8
            { header: "BWB Time (s)", key: "bwb_time", width: 15 },               //9
            { header: "User Name", key: "user_name", width: 20 },               //10
        ];

        // Add rows to the sheet

        rows.forEach(row => {
            sheet.addRow({
                date: row.DTTM,
                serial_no: row.serial_no,
                recipe_id: row.recipe_id,
                set_batch: row.set_batch,
                batch_no: row.batch_no,
                start_time: row.start_time_only,
                stop_time: row.stop_time_only,
                cycle_time: row.cycle_time,
                bwb_time: row.bwb_time,
                user_name: row.user_name,
            });
        });

        //add heading style
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Production Report from ${params.from} to ${params.to}`]);

        sheet.mergeCells('A1:J1');
        sheet.mergeCells('A2:J2');

        // Style header rows
        sheet.getCell("A1").font = { bold: true, size: 16 };
        sheet.getCell("A1").alignment = { horizontal: "center" };
        sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };
        sheet.getCell("A2").font = { bold: true, size: 12 };
        sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
        sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };



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
        const reportsDir = path.join(__dirname, "..", "reports", "production");
        // Ensure reports directory exists
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir);
        }
        const filePath = path.join(reportsDir, `Production_Report_${params.from}_to_${params.to}.xlsx`);
        await workbook.xlsx.writeFile(filePath);
        return ({ status: true, filePath });
    } catch (error) {
        return ({ status: false, error });
    }
}

// getProductionReport({ from: "2025-11-24", to: "2025-11-24" })
//     .then(result => {
//         console.log(result);
//     })

module.exports = {
    getProductionReport
};