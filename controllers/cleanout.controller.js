const db = require("../config/config.mysql.report.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");

async function getCleanoutReport(param) {
    try {

        // Query Data
        const [rows] = await db.query(
            `SELECT * 
            FROM report_material_log 
            WHERE DATE(DTTM) BETWEEN ? AND ? 
            AND LOWER(recipe_id) = 'cleanout';`,
            [param.from, param.to]
        );

        if (rows.length === 0) {
            const err = new Error("NO_DATA");
            err.code = "NO_DATA";
            err.message = "No data found for given date range";
            throw err;
        }
        // console.dir("Rows fetched for cleanout report: ", rows.length);
        // console.dir(rows, { depth: null, maxArrayLength: null, colors: true });
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("cleanout report");

        sheet.columns = [
            { header: "Date", key: "date", width: 15 },
            { header: "Time", key: "time", width: 15 },
            { header: "Recipe Name", key: "recipe_id", width: 20 },
            { header: "Material Code", key: "material_code", width: 25 },
            { header: "Material Name", key: "material_name", width: 25 },
            { header: "Material Type", key: "material_type", width: 20 },
            { header: "Set Weight (Kg)", key: "set_wt", width: 18 },
            { header: "Total Actual Weight (Kg)", key: "total_act_wt", width: 25 }
        ];

        // Headers
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Cleanout Report from ${param.from} to ${param.to}`]);
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

        // Data rows
        rows.forEach(r => {
            sheet.addRow({
                date: new Date(r.DTTM).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }),
                time: new Date(r.DTTM).toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata' }),
                recipe_id: r.recipe_id,
                material_code: r.material_code,
                material_name: r.material_name,
                material_type: r.material_type,
                set_wt: r.set_wt,
                total_act_wt: r.act_wt
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
        const dir = path.join(__dirname, "reports", "cleanout_reports");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const fileName = path.join(dir, "Cleanout_reports.xlsx");
        await workbook.xlsx.writeFile(fileName);

        return { status: true, filePath: fileName };


    } catch (error) {
        console.error("Error triggered in generate cleaoutReport : ", error);
        return {
            status: false,
            filePath: null,
            error
        };
    }
}


module.exports =
{
    getCleanoutReport
}