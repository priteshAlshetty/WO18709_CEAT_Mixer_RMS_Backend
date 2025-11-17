const db = require("../config/config.mysql.report.js");
const path = require("path");

const ExcelJS = require("exceljs");

// batch report generation function

async function generateBatchReport({ batch_details, weighing_details, mixing_details }, workbook, sheetname) {

    // const workbook = new ExcelJS.Workbook();
    // const sr_no = batch_details.serial_no;
    // const batch_no = batch_details.batch_no;
    const sheet = workbook.addWorksheet(sheetname || 'sheet1');


    // -------------------------------
    // 1. COLUMN WIDTHS
    // -------------------------------
    sheet.getColumn(1).width = 45;  // Column A
    sheet.getColumn(2).width = 25;  // Column B
    sheet.getColumn(6).width = 14;  // Column C

    const headerStyle = {
        font: { bold: true, size: 16 },
        alignment: { horizontal: "center", vertical: "middle" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "d9b38c" } }
    };

    const header2Style = {
        font: { bold: true, size: 12 },
        alignment: { horizontal: "center", vertical: "middle" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "f2e6d9" } }
    };

    const tableHeaderStyle = {
        font: { bold: true, size: 14 },
        alignment: { horizontal: "center" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "e6e6e6" } },
        border: {
            top: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
            bottom: { style: "thin" }
        }
    };

    const tableSubHeaderStyle = {
        font: { bold: true, size: 12 },
        alignment: { horizontal: "center" },
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } },
        border: {
            top: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
            bottom: { style: "thin" }
        }
    };

    const cellBorder = {
        border: {
            top: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
            bottom: { style: "thin" }
        }
    };

    // -------------------------------
    // 2. MERGE TITLE ROWS
    // -------------------------------

    //headers

    sheet.mergeCells("A1:N1");
    sheet.getCell("A1").value = "CEAT LIMITED AMBARNATH : MIXER 1";
    Object.assign(sheet.getCell("A1"), headerStyle);

    sheet.mergeCells("A2:N2");
    sheet.getCell("A2").value = "Batch Details";
    Object.assign(sheet.getCell("A2"), tableHeaderStyle);

    // -------------------------------
    // batch Details
    // -------------------------------
    for (let row = 3; row <= 6; row++) {
        sheet.mergeCells(`C${row}:E${row}`);
        sheet.mergeCells(`H${row}:I${row}`);
        sheet.mergeCells(`K${row}:N${row}`);
    }


    // -------------------------------
    // INSERT batch_details INSIDE MERGED CELLS
    // -------------------------------

    // Row 3
    sheet.getCell("A3").value = "Date";
    sheet.getCell("B3").value = "Time";
    sheet.getCell("C3").value = "Compound Name";
    sheet.getCell("F3").value = "Serial No";
    sheet.getCell("G3").value = "Shift";
    sheet.getCell("H3").value = "User";
    sheet.getCell("J3").value = "Batch No";
    sheet.getCell("K3").value = "Set Batchs";

    // Row 4
    sheet.getCell("A4").value = batch_details.DTTM;
    sheet.getCell("B4").value = batch_details.time_only;
    sheet.getCell("C4").value = batch_details.recipe_id;
    sheet.getCell("F4").value = batch_details.serial_no;
    sheet.getCell("G4").value = batch_details.shift;
    sheet.getCell("H4").value = batch_details.user_name;
    sheet.getCell("J4").value = batch_details.batch_no;
    sheet.getCell("K4").value = batch_details.set_batch;

    //-------------------------------
    // Row 5
    sheet.getCell("A5").value = "Dis Time";
    sheet.getCell("B5").value = "Space Time";
    sheet.getCell("C5").value = "Used Time";
    sheet.getCell("F5").value = "Dis. Temp";
    sheet.getCell("H5").value = "Dis. Energy";
    sheet.getCell("J5").value = "Dis. Power";
    sheet.getCell("K5").value = "Work Type";
    // -------------------------------
    // Row 6
    sheet.getCell("A6").value = batch_details.dis_time;
    sheet.getCell("B6").value = batch_details.space_time;
    sheet.getCell("C6").value = batch_details.used_time;
    sheet.getCell("F6").value = batch_details.dis_temp;
    sheet.getCell("G6").value = "  ";
    sheet.getCell("H6").value = batch_details.dis_energy;
    sheet.getCell("J6").value = batch_details.dis_power;
    sheet.getCell("K6").value = batch_details.work_type;




    sheet.mergeCells("A7:N7");
    sheet.getCell("A7").value = batch_details.mode === 'Auto' ? "Mixer is in AUTO Mode " : "Mixer is in MANUAL Mode ";
    Object.assign(sheet.getCell("A7"), header2Style);

    // -------------------------------
    // Weighing parameters
    // -------------------------------

    sheet.mergeCells("A8:N8");
    sheet.getCell("A8").value = "Weighing Parameters";
    Object.assign(sheet.getCell("A8"), tableHeaderStyle);

    //  -------------------------------
    // merge cells for weighing parameters
    // -------------------------------

    let weighingStartRow = 9;
    let weighingEndRow = weighingStartRow + weighing_details.length + 1; // +1 for total row

    for (let row = weighingStartRow; row <= weighingEndRow; row++) {
        sheet.mergeCells(`B${row}:D${row}`);
        sheet.mergeCells(`E${row}:H${row}`);
        sheet.mergeCells(`I${row}:N${row}`);
    }

    //  -------------------------------
    // Weighing parameters Headers
    // -------------------------------

    sheet.getCell("A9").value = "Ingriedient Type";
    sheet.getCell("B9").value = "Material Code";
    sheet.getCell("E9").value = "Set Weight (Kg)";
    sheet.getCell("I9").value = "Actual Weight (Kg)";

    let weighingDataStartRow = 10;

    weighing_details.forEach((item, index) => {
        const row = weighingDataStartRow + index;

        sheet.getCell(`A${row}`).value = item.material_type;
        sheet.getCell(`B${row}`).value = item.material_code;
        sheet.getCell(`E${row}`).value = item.set_wt;
        sheet.getCell(`I${row}`).value = item.act_wt;
    });

    let totalSetWt = 0;
    let totalActWt = 0;

    weighing_details.forEach(item => {
        totalSetWt += item.set_wt;
        totalActWt += item.act_wt;
    });

    let weighingDataTotalRows = weighingDataStartRow + weighing_details.length;


    sheet.getCell(`A${weighingDataTotalRows}`).value = "----->>";
    sheet.getCell(`B${weighingDataTotalRows}`).value = "TOTAL";
    sheet.getCell(`B${weighingDataTotalRows}`).font = { bold: true };

    sheet.getCell(`E${weighingDataTotalRows}`).value = totalSetWt;
    sheet.getCell(`E${weighingDataTotalRows}`).font = { bold: true };
    sheet.getCell(`I${weighingDataTotalRows}`).value = totalActWt;
    sheet.getCell(`I${weighingDataTotalRows}`).font = { bold: true };



    // -------------------------------
    // MIXING PArameters
    // -------------------------------

    const mixingStartRow = weighingDataTotalRows + 1;


    sheet.mergeCells(`A${mixingStartRow}:N${mixingStartRow}`);
    sheet.getCell(`A${mixingStartRow}`).value = "Mixing Parameters";
    Object.assign(sheet.getCell(`A${mixingStartRow}`), tableHeaderStyle);

    sheet.mergeCells(`A${mixingStartRow + 1}: A${mixingStartRow + 2}`);
    sheet.getCell(`A${mixingStartRow + 1}`).value = "Recipe Seq";
    Object.assign(sheet.getCell(`A${mixingStartRow + 1}`), tableHeaderStyle);

    sheet.mergeCells(`B${mixingStartRow + 1}: B${mixingStartRow + 2}`);
    sheet.getCell(`B${mixingStartRow + 1}`).value = "Mode";
    Object.assign(sheet.getCell(`B${mixingStartRow + 1}`), tableHeaderStyle);

    sheet.mergeCells(`C${mixingStartRow + 1}: D${mixingStartRow + 1}`);
    sheet.getCell(`C${mixingStartRow + 1}`).value = "Time (Sec)";
    Object.assign(sheet.getCell(`C${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`C${mixingStartRow + 2}`).value = "Set";;
    Object.assign(sheet.getCell(`C${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`D${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`D${mixingStartRow + 2}`), tableSubHeaderStyle);

    sheet.mergeCells(`E${mixingStartRow + 1}: F${mixingStartRow + 1}`);
    sheet.getCell(`E${mixingStartRow + 1}`).value = "Temperature (°C)";
    Object.assign(sheet.getCell(`E${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`E${mixingStartRow + 2}`).value = "Set";;
    Object.assign(sheet.getCell(`E${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`F${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`F${mixingStartRow + 2}`), tableSubHeaderStyle);

    sheet.mergeCells(`G${mixingStartRow + 1}: H${mixingStartRow + 1}`);
    sheet.getCell(`G${mixingStartRow + 1}`).value = "Power (KW)";
    Object.assign(sheet.getCell(`G${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`G${mixingStartRow + 2}`).value = "Set";;
    Object.assign(sheet.getCell(`G${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`H${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`H${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.mergeCells(`I${mixingStartRow + 1}: J${mixingStartRow + 1}`);
    sheet.getCell(`I${mixingStartRow + 1}`).value = "Energy (KWH)";
    Object.assign(sheet.getCell(`I${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`I${mixingStartRow + 2}`).value = "Set";;
    Object.assign(sheet.getCell(`I${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`J${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`J${mixingStartRow + 2}`), tableSubHeaderStyle);

    sheet.mergeCells(`K${mixingStartRow + 1}: L${mixingStartRow + 1}`);
    sheet.getCell(`K${mixingStartRow + 1}`).value = "Pressure (KG/cm²)";
    Object.assign(sheet.getCell(`K${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`K${mixingStartRow + 2}`).value = "Set";
    Object.assign(sheet.getCell(`K${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`L${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`L${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.mergeCells(`M${mixingStartRow + 1}: N${mixingStartRow + 1}`);
    sheet.getCell(`M${mixingStartRow + 1}`).value = "RPM";
    Object.assign(sheet.getCell(`M${mixingStartRow + 1}`), tableSubHeaderStyle);
    sheet.getCell(`M${mixingStartRow + 2}`).value = "Set";
    Object.assign(sheet.getCell(`M${mixingStartRow + 2}`), tableSubHeaderStyle);
    sheet.getCell(`N${mixingStartRow + 2}`).value = "Actual";
    Object.assign(sheet.getCell(`N${mixingStartRow + 2}`), tableSubHeaderStyle);

    let mixingDataStartRow = mixingStartRow + 3;

    mixing_details.forEach((item, index) => {
        const row = mixingDataStartRow + index;
        sheet.getCell(`A${row}`).value = item.recipe_seq;
        sheet.getCell(`B${row}`).value = item.mode;
        sheet.getCell(`C${row}`).value = item.time_set;
        sheet.getCell(`D${row}`).value = item.time_act;
        sheet.getCell(`E${row}`).value = item.temp_set;
        sheet.getCell(`F${row}`).value = item.temp_act;
        sheet.getCell(`G${row}`).value = item.kw_set;
        sheet.getCell(`H${row}`).value = item.kw_act;
        sheet.getCell(`I${row}`).value = item.kwh_set;
        sheet.getCell(`J${row}`).value = item.kwh_act;
        sheet.getCell(`K${row}`).value = item.press_set;

        sheet.getCell(`L${row}`).value = item.press_act;
        sheet.getCell(`M${row}`).value = item.rpm_set;
        sheet.getCell(`N${row}`).value = item.rpm_act;
    });

    let mixingDataEndRow = mixingDataStartRow + mixing_details.length;
    // -------------------------------
    // APPLY BORDER TO ROWS 
    // -------------------------------
    for (let i = 1; i <= mixingDataEndRow + 1; i++) {
        sheet.getRow(i).eachCell(cell => Object.assign(cell, cellBorder));
    }
    // -------------------------------
    // 5. SAVE FILE
    // -------------------------------
    // await workbook.xlsx.writeFile("BatchReport.xlsx");
    console.log("Excel report created: BatchReport.xlsx");
    // return workbook;
}

async function getBatchDetails(params) {

    const [batch_details] = await db.query(
        /* sql */`SELECT 
        TIME(DTTM) AS time_only,
        report_batch_details.*
        FROM 
        report_batch_details
        WHERE 
        batch_no = ?  AND serial_no = ? AND recipe_id = ?;`
        , [params.batch_no, params.serial_no, params.recipe_id]);

    if (batch_details.length === 0) {
        return null;
    }
    else {
        return batch_details[0];
    }
}

async function getWeighingDetails(params) {
    const [batch_details] = await db.query(
        /* sql */`SELECT  
        material_type,material_code,  set_wt, act_wt 
        FROM report_material_log
        WHERE batch_no = ?  AND serial_no = ? AND recipe_id = ?;`
        , [params.batch_no, params.serial_no, params.recipe_id]);

    if (batch_details.length === 0) {
        return [];
    } else {
        return batch_details;
    }


}

async function getMixingDetails(params) {

    const [mixing_details] = await db.query(/*sql*/ `
        SELECT
        recipe_seq, mode, time_set, time_act, temp_set, temp_act, kw_set, kw_act, kwh_set, kwh_act, press_set, press_act, rpm_set, rpm_act
        FROM report_mixing_details
        WHERE batch_no = ?  AND serial_no = ? AND recipe_id = ? ;  `, [params.batch_no, params.serial_no, params.recipe_id]);

    if (mixing_details.length === 0) {
        return [];
    } else {
        return mixing_details;
    }
}

// async function generateExcelBatchReport(params) {

//     for (const param of params) {
//         const { batch_no, serial_no, recipe_id } = param;

//         const batch_details = await getBatchDetails({ batch_no, serial_no, recipe_id });
//         const weighing_details = await getWeighingDetails({ batch_no, serial_no, recipe_id });
//         const mixing_details = await getMixingDetails({ batch_no, serial_no, recipe_id });
//         const workbook = new ExcelJS.Workbook();

//         workbook.creator = 'CEAT Mixer RMS';
//         workbook.created = new Date();
//         workbook.modified = new Date();
//         const report = await generateBatchReport({ batch_details, weighing_details, mixing_details }, workbook, `${serial_no}-${batch_no}`);


//     }
// }

async function generateExcelBatchReport(params) {

    // Create ONE workbook for all reports
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'CEAT Mixer RMS';
    workbook.created = new Date();
    workbook.modified = new Date();

    for (const param of params) {

        const { batch_no, serial_no, recipe_id } = param;

        // Fetch data
        const batch_details = await getBatchDetails({ batch_no, serial_no, recipe_id });
        const weighing_details = await getWeighingDetails({ batch_no, serial_no, recipe_id });
        const mixing_details = await getMixingDetails({ batch_no, serial_no, recipe_id });

        if (!batch_details || Object.keys(batch_details).length === 0) {
            console.log(`❌ No data for Serial ${serial_no}, Batch ${batch_no}`);
            continue;
        }

        // This function should create a sheet inside the workbook
        await generateBatchReport(
            { batch_details, weighing_details, mixing_details },
            workbook,
            `${serial_no}-${batch_no}`      // Sheet name
        );

        console.log(`✔ Sheet added: ${serial_no}-${batch_no}`);
    }

    // Save workbook ONCE after all sheets added
    const fileName = path.join(__dirname, "reports", "batch_report", "BatchReports_All.xlsx");
    // const fileName = `\\reports\\batch_report\\BatchReports_All.xlsx`;
    await workbook.xlsx.writeFile(fileName);

    // console.log(`🎉 All reports saved in: ${fileName}`);

    return fileName;
}

// generateExcelBatchReport([{ batch_no: 1, serial_no: 1756, recipe_id: 'MT6710' },
// { batch_no: 2, serial_no: 1756, recipe_id: 'MT6701' }, { batch_no: 3, serial_no: 1756, recipe_id: 'MT671' }
// ]).then((filePath) => {
//     console.log(filePath);
// }).catch((error) => {
//     console.error("Error generating batch reports:", error);
// });


// material report generation function

// async function generateExcelMaterialReport(params) {
//     try {

//         const [rows] = await db.query(
//         /* sql */`SELECT 
//         material_type, material_code ,ROUND( SUM(act_wt),3) AS total_act_wt
//         FROM 
//         report_material_log
//         WHERE 
//         DTTM BETWEEN ? AND ?
//         GROUP BY 
//         material_type, material_code
//         ORDER BY 
//         material_type;`
//             , [params.from, params.to]);

//         if (rows.length === 0) {
//             console.error("❌ No data for the given date range.");
//             throw new Error("No data for the given date range.");
//         }

//         const workbook = new ExcelJS.Workbook();
//         workbook.creator = 'CEAT Mixer RMS';
//         workbook.created = new Date();
//         workbook.modified = new Date();
//         const sheet = workbook.addWorksheet('Material Report');

//         // Define columns
//         sheet.columns = [
//             { header: 'Material Type', key: 'material_type', width: 30 },
//             { header: 'Material Code', key: 'material_code', width: 20 },
//             { header: 'Total Actual Weight (Kg)', key: 'total_act_wt', width: 25 }
//         ];
//         // insert rows at top
//         sheet.insertRow(1, ['CEAT LIMITED AMBARNATH : MIXER 1']);
//         sheet.insertRow(2, [`Material Report from ${params.from} to ${params.to}`]);
//         sheet.mergeCells('A1:C1');
//         sheet.mergeCells('A2:C2');

//         //header styles

//         sheet.getCell("A1").font = { bold: true, size: 16 };
//         sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
//         sheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } }
//         sheet.getCell("A1").border = {
//             top: { style: "thick" },
//             left: { style: "thick" },
//             right: { style: "thick" },
//             bottom: { style: "thick" }
//         }

//         sheet.getCell("A2").font = { bold: true, size: 12 };
//         sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
//         sheet.getCell("A2").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD6F7FF" } }
//         // Add rows
//         rows.forEach(row => {
//             sheet.addRow(row);
//         });

//         // cell border style
//         const cellBorder = {
//             border: {
//                 top: { style: "thin" },
//                 left: { style: "thin" },
//                 right: { style: "thin" },
//                 bottom: { style: "thin" }
//             }
//         };
//         // Apply border to all cells
//         sheet.eachRow(row => {
//             row.eachCell(cell => {
//                 Object.assign(cell, cellBorder);
//             });
//         });


//         // Save workbook
//         const fileName = path.join(__dirname, "reports", "material_report", "MaterialReport.xlsx");
//         await workbook.xlsx.writeFile(fileName);
//         // console.log("Excel report created: MaterialReport.xlsx");
//         return { status: true, fileName };

//     } catch (error) {
//         console.error("❌ Error generating material report:", error);
//         throw error;
//     }

// }

// generateExcelMaterialReport({ from: '2025-11-01', to: '2025-11-30' }).then((filePath) => {
//     console.log(filePath);
// }).catch((error) => {
//     console.error("Error generating material report:", error);
// });



async function generateExcelMaterialReport(params) {
    try {
        // STEP 1 → Query Data
        const [rows] = await db.query(
            `SELECT 
                material_type,
                material_code,
                ROUND(SUM(act_wt),3) AS total_act_wt
            FROM report_material_log
            WHERE DTTM BETWEEN ? AND ?
            GROUP BY material_type, material_code
            ORDER BY material_type;`,
            [params.from, params.to]
        );

        if (rows.length === 0) {
            console.error("❌ No data for the given date range.");
            const err = new Error("NO_DATA");
            err.code = "NO_DATA";
            err.message = "No data for the given date range.";
            throw err;
        }

        // STEP 2 → Prepare Excel Workbook
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "CEAT Mixer RMS";
        workbook.created = new Date();
        workbook.modified = new Date();

        const sheet = workbook.addWorksheet("Material Report");

        sheet.columns = [
            { header: "Material Type", key: "material_type", width: 30 },
            { header: "Material Code", key: "material_code", width: 20 },
            { header: "Total Actual Weight (Kg)", key: "total_act_wt", width: 25 }
        ];

        // Header rows
        sheet.insertRow(1, ["CEAT LIMITED AMBARNATH : MIXER 1"]);
        sheet.insertRow(2, [`Material Report from ${params.from} to ${params.to}`]);
        sheet.mergeCells("A1:C1");
        sheet.mergeCells("A2:C2");

        // Header styling
        sheet.getCell("A1").font = { bold: true, size: 16 };
        sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
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

        // Insert data rows
        rows.forEach(row => sheet.addRow(row));

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

        // STEP 3 → Create folder if not exists
        const dir = path.join(__dirname, "reports", "material_report");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // STEP 4 → Save file
        const fileName = path.join(dir, "MaterialReport.xlsx");
        await workbook.xlsx.writeFile(fileName);
        console.log("✔ Excel report created:", fileName);

        // Correct return value
        return { status: true, filePath: fileName };

    } catch (error) {
        console.error("❌ Error generating material report:", error);
        return { status: false, code: error.code || "ERROR", message: error.message || "Error generating material report" };
    }
}

module.exports = {
    generateExcelBatchReport,
    generateExcelMaterialReport
};      