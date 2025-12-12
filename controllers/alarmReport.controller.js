const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { exceptions } = require("winston");
const { getMySQLTimestamp } = require("../utils/timestamp.helper.js");

async function getAlarmReport(params) {
    try {
        // const from = getMySQLTimestamp(params.from);
        // const to = getMySQLTimestamp(params.to);

        // STEP 1 → Query Data
        const [rows] = await db.query(`SELECT * FROM report_alarm WHERE DATE(DTTM) BETWEEN ? AND ? ORDER BY DTTM ASC`, [params.from, params.to]);

        if (rows.length === 0) {
            {
                // console.error("❌ No data for the given date range.");
                const err = new Error("NO_DATA");
                err.code = "NO_DATA";
                err.message = "No data for the given date range.";
                throw err;
            }
        }
        // STEP 2 → Prepare Excel Workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "CEAT Mixer RMS";
        workbook.created = new Date();
        workbook.modified = new Date();
        const sheet = workbook.addWorksheet("Alarm Report");
        sheet.columns = [
            { header: "Date", key: "Date", width: 20 },
            { header: "Time", key: "Time", width: 20 },
            { header: "Recipe_ID", key: "recipe_id", width: 15 },
            { header: "Batch No", key: "batch_no", width: 15 },
            { header: "Serial No", key: "sr_no", width: 30 },
            { header: "Alarm Text", key: "alarm_text", width: 10 },
            { header: "login", key: "login", width: 10 },
        ];
        // Add rows to the sheet
        rows.forEach((row) => {
            const dateString = row.DTTM.toISOString();
            sheet.addRow({
                Date: dateString.split('T')[0],
                Time: dateString.split('T')[1].split('.')[0],
                recipe_id: row.recipe_id,
                batch_no: row.batch_no,
                sr_no: row.sr_no,
                alarm_text: row.alarm_text,
                login: row.current_login,
            });
        });

        // add heading style
        // Headers
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Alarm Report from ${params.from} to ${params.to}`]);
        sheet.mergeCells("A1:G1");
        sheet.mergeCells("A2:G2");

        // Style header rows
        sheet.getCell("A1").font = { bold: true, size: 16 };
        sheet.getCell("A1").alignment = { horizontal: "center" };

        sheet.getCell("A2").font = { bold: true, size: 12 };
        sheet.getCell("A2").alignment = { horizontal: "center" };


        sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };


        sheet.getCell("A2").font = { bold: true, size: 12 };
        sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
        sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };


        // Apply border
        sheet.eachRow(row => {
            row.eachCell(cell => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" },
                    bottom: { style: "thin" }
                };
            });
        });

        sheet.autoFilter = {
            from: 'C3',
            to: 'G3'
        }
        // STEP 3 → Save Workbook to a file
        const dir = path.join(__dirname, "..", "reports", "Alarms_reports");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const fileName = `AlarmReport.xlsx`;
        const filePath = path.join(dir, fileName);
        await workbook.xlsx.writeFile(filePath);

        return {
            status: true,
            filePath
        };
    } catch (error) {
        return ({
            status: false, error, path: null
        });
    }
}

module.exports = {
    getAlarmReport
}