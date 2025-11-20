const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");

async function getShiftPlanReport(params) {


    try {
        // STEP 1 → Query Data
        const [rows] = await db.query(
            `
            SELECT 
                DATE(r.DTTM) AS date,
                TIME(r.DTTM) AS Time,
                r.shift,
                r.serial_no,
                r.recipe_id,
                r.set_batch,
                r.batch_no,
                r.user_name
            FROM report_batch_details r
            INNER JOIN (
                SELECT 
                    serial_no,
                    recipe_id,
                    MAX(batch_no) AS max_batch_no
                FROM report_batch_details
                GROUP BY serial_no, recipe_id
            ) t
            ON  r.serial_no = t.serial_no
            AND r.recipe_id = t.recipe_id
            AND r.batch_no = t.max_batch_no
            WHERE DATE(r.DTTM) BETWEEN ? AND ?
            ORDER BY r.serial_no, r.recipe_id;
            `,
            [params.from, params.to]
        )

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

        const sheet = workbook.addWorksheet("Shift Plan Report");

        sheet.columns = [
            { header: "Date", key: "date", width: 15 },                         //1
            { header: "Time", key: "time", width: 15 },                         //2
            { header: "Shift", key: "Shift", width: 7 },                        //3
            { header: "Serial no", key: "Serial no", width: 25 },               //4
            { header: "Recipe name", key: "Recipe name", width: 25 },           //5
            { header: "Set Batch", key: "Set Batch", width: 15 },               //6
            { header: "Finished Batch", key: "Finished Batch", width: 15 },     //7
            { header: "Username", key: "Username", width: 15 },                 //8
        ];

        // Headers
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Shift plan Execution Report from ${params.from} to ${params.to}`]);
        sheet.mergeCells("A1:H1");
        sheet.mergeCells("A2:H2");

        // Style header rows
        sheet.getCell("A1").font = { bold: true, size: 16 };
        sheet.getCell("A1").alignment = { horizontal: "center" };

        sheet.getCell("A2").font = { bold: true, size: 12 };
        sheet.getCell("A2").alignment = { horizontal: "center" };


        sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };
        sheet.getCell("A1").border = {
            top: { style: "thick" },
            left: { style: "thick" },
            right: { style: "thick" },
            bottom: { style: "thick" }
        };

        sheet.getCell("A2").font = { bold: true, size: 12 };
        sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
        sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };

        // data rows adding
        rows.forEach(r => {
            sheet.addRow({
                "date": r.date,                 // DATE(r.DTTM)
                "time": r.Time,                 // TIME(r.DTTM)
                "Shift": r.shift,               // Shift
                "Serial no": r.serial_no,       // Serial no
                "Recipe name": r.recipe_id,     // Recipe name (or recipe_id)
                "Set Batch": r.set_batch,       // Set Batch
                "Finished Batch": r.batch_no,   // Finished Batch
                "Username": r.user_name         // Username
            });
        });

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

        // Save report
        const dir = path.join(__dirname, "reports", "shift_plan_reports");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const fileName = path.join(dir, "shift_plan_reports.xlsx");
        await workbook.xlsx.writeFile(fileName);
        return { status: true, filePath: fileName };

    } catch (err) {
        console.error("Error in getShiftPlanReport() : ", err.message);
        return ({
            status: false,
            filePath: null,
            err
        })
    }
}

// getShiftPlanReport({
//     from: "2025-11-19", to: "2025-11-20"
// }).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.error("ERR: ", err)
// })

module.exports = {
    getShiftPlanReport
}