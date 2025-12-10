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

async function deleteDowntime(params) {
    try {
        const sr = params.sr;
        const [result] = await db.query(
            `DELETE FROM report_downtime WHERE sr = ?`,
            [sr]
        );
        if (result.affectedRows === 0) {
            return { status: false, message: `No row deleted for sr ${sr}` };

        }

        return { status: true, result };
    } catch (error) {
        return { status: false, error };
    }

}

async function addDowntime(params) {
    try {

        const downtime_start = getMySQLTimestamp(new Date(params.downtime_start));
        const downtime_stop = getMySQLTimestamp(new Date(params.downtime_stop));
        const [result] = await db.query(
            `INSERT INTO report_downtime
            (downtime_start, downtime_stop, error_code, category, sub_category, description, DTTM)
            VALUES (?, ?, ?, ?, ?, ?, NOW())`,
            [downtime_start, downtime_stop, params.error_code, params.category, params.sub_category, params.description]
        );
        return { status: true, result };
    } catch (error) {
        return { status: false, error };
    }
}

async function generateDowntimeReport(params) {
    try {
        const result = await getDowntime(params);
        if (!result.status) {
            return result;
        }
        const downtime_data = result.downtime_data;
        // Create Excel workbook and worksheet
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Downtime Report');
        // Define columns
        sheet.columns = [
            { header: 'SR', key: 'sr', width: 10 },
            { header: 'DTTM', key: 'DTTM', width: 20 },
            { header: 'Downtime Start', key: 'downtime_start', width: 20 },
            { header: 'Downtime Stop', key: 'downtime_stop', width: 20 },
            { header: 'total_downtime', key: 'total_downtime', width: 20 },
            { header: 'Error Code', key: 'error_code', width: 20 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Sub Category', key: 'sub_category', width: 20 },
            { header: 'login', key: 'login', width: 15 },
            { header: 'Description', key: 'description', width: 100 },
        ];
        // add heading style
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Downtime Report from ${params.from} to ${params.to}`]);
        sheet.getCell("A1").font = { size: 16, bold: true };
        sheet.getCell("A1").alignment = { horizontal: "center" };
        sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };
        sheet.getCell("A2").font = { size: 12, bold: true };
        sheet.getCell("A2").alignment = { horizontal: "center" };
        sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } };
        sheet.mergeCells('A1:J1');
        sheet.mergeCells('A2:J2');

        // Add rows
        downtime_data.forEach(item => {
            sheet.addRow({
                sr: item.sr,
                DTTM: item.DTTM,
                downtime_start: item.downtime_start,
                downtime_stop: item.downtime_stop,
                total_downtime: item.total_downtime,
                error_code: item.error_code,
                category: item.category,
                sub_category: item.sub_category,
                login: item.current_login,
                description: item.description
            });
        });

        // add border to all cells
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

        // Apply auto-filter to the data range
        sheet.autoFilter = {
            from: 'A3',
            to: 'J3',
        }

        // Save workbook to file
        // Save report
        const dir = path.join(__dirname, "..", "reports", "downtime");

        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const fileName = path.join(dir, "downtime_report.xlsx");

        await workbook.xlsx.writeFile(fileName);

        return { status: true, filePath: fileName };
    } catch (error) {
        return { status: false, error };
    }
}


module.exports = {
    getDowntime,
    updateDowntime,
    deleteDowntime,
    addDowntime,
    generateDowntimeReport
};


