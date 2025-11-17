const express = require('express');
const { getBatchNameByDate, getSerialByBatchName, getBatchNoBySerialNo, getExcelBatchReport } = require('../controllers/reporting.form.controller.js');
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post('/weighing/getExcelReport', async (req, res) => {
    let requestData = req.body;
    console.log(requestData);
    const { from, to } = requestData;
    const batchNames = await getBatchNameByDate(from, to);

    if (!batchNames) {
        return res.status(404).json({ message: "No batch names found for the given date range" });
    } else {
        console.log("Batch Names:", batchNames);
        res.status(200).json({ BATCH_NAME: batchNames });
    }
})


router.post('/batch/getBatchName/bydate', async (req, res) => {
    try {
        const requestData = req.body;

        // Validate input
        if (!requestData?.from || !requestData?.to) {
            console.error("❌ Missing 'from' or 'to' date");
            return res.status(400).json({
                message: "Missing Required Fields. 'from' and 'to' dates are required."
            });
        }

        const { from, to } = requestData;

        const batchNames = await getBatchNameByDate(from, to);

        if (!batchNames || batchNames.length === 0) {
            console.warn(`⚠ No batch names found between ${from} and ${to}`);
            return res.status(404).json({ message: "No batch names found" });
        }

        console.log("✔ Batch Names:", batchNames);
        return res.status(200).json({ BATCH_NAME: batchNames });

    } catch (error) {
        console.error("🔥 Error in /batch/getBatchName/bydate:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/batch/getSerial/byBatchName', async (req, res) => {
    try {
        const requestData = req.body;

        if (!requestData?.batchName || !requestData?.from || !requestData?.to) {
            console.error("❌ Missing 'batchName', 'from', or 'to'");
            return res.status(400).json({
                message: "'batchName', 'from', and 'to' fields are required."
            });
        }

        if (!Array.isArray(requestData.batchName) || requestData.batchName.length === 0) {
            console.error("❌ 'batchName' must be a non-empty array");
            return res.status(400).json({
                message: "'batchName' should be a non-empty array"
            });
        }

        const { batchName, from, to } = requestData;

        const serialNumbers = await getSerialByBatchName(batchName, from, to);

        if (!serialNumbers || serialNumbers.length === 0) {
            console.warn("⚠ No serial numbers found");
            return res.status(404).json({ message: "No serial numbers found" });
        }

        console.log("✔ Serial Numbers:", serialNumbers);
        return res.status(200).json({ SERIAL_NO: serialNumbers });

    } catch (error) {
        console.error("🔥 Error in /batch/getSerial/byBatchName:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post('/batch/getbatchNo/bySerialNo', async (req, res) => {
    try {
        const requestData = req.body;

        if (!requestData?.serialNo) {
            console.error("❌ Missing 'serialNo'");
            return res.status(400).json({
                message: "Missing Required Fields. 'serialNo' is required."
            });
        }

        const { serialNo } = requestData;

        const batchNumbers = await getBatchNoBySerialNo(serialNo);

        if (!batchNumbers || batchNumbers.length === 0) {
            console.warn(`⚠ No batch numbers found for serialNo: ${serialNo}`);
            return res.status(404).json({ message: "No batch numbers found" });
        }

        console.log("✔ Batch Numbers:", batchNumbers);
        return res.status(200).json({ BATCH_NO: batchNumbers });

    } catch (error) {
        console.error("🔥 Error in /batch/getbatchNo/bySerialNo:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});





router.post('/batch/getExcelReport', async (req, res) => {
    try {
        const requestData = req.body;

        // ---- Validate body ----
        const { recipeId, serialNo, batchNo, dttmFrom, dttmTo } = requestData || {};
        if (!recipeId || !serialNo || !batchNo || !dttmFrom || !dttmTo) {
            console.error("❌ Missing required fields:", requestData);
            return res.status(400).json({ message: "Missing required fields" });
        }

        const reportParams = { recipeId, serialNo, batchNo, dttmFrom, dttmTo };

        // ---- Generate Excel & get file path ----
        let reportPath;
        try {
            reportPath = await getExcelBatchReport(reportParams);
            console.log("✔ Generated Report path:", reportPath);
        } catch (err) {
            console.error("❌ Error generating Excel report:", err);
            return res.status(500).json({ message: "Error generating the report", error: err.message, errorStack: err.stack });
        }

        // ---- Validate file existence ----
        if (!reportPath || !fs.existsSync(reportPath)) {
            console.error("❌ Report file not found at path:", reportPath);
            return res.status(500).json({ message: "Generated report file not found" });
        }

        // ---- Send the file as a download ----
        const downloadName = `BatchReport_${serialNo}_${batchNo}.xlsx`;

        return res.download(reportPath, downloadName, (err) => {
            if (err) {
                console.error("❌ Error downloading file:", err);
                return res.status(500).json({ message: "Error sending file", error: err.message, errorStack: err.stack });
            }
        });

    } catch (error) {
        console.error("🔥 Fatal Error in /batch/getExcelReport:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message, errorStack: error.stack });
    }
});


router.post('/summary/getBatchName/byDate', async (req, res) => {
    let requestData = await req.body;
    console.log(requestData);
    //TODO: Implement logic to fetch batch names by date
    res.status(200).json({ BATCH_NAME: ['MT051', 'MT052', 'MT053'] });
})

router.post('/summary/getSerial/byBatchName', async (req, res) => {
    let requestData = await req.body;
    console.log(requestData);
    //TODO: Implement logic to fetch serial numbers by batch name
    res.status(200).json({ SERIAL_NO: ['1952', '1953', '1954'] });
})

router.post('/summary/getExcelReport', async (req, res) => {
    let requestData = await req.body;
    console.log(requestData);
    //TODO: Implement logic to generate and return the Excel report
    res.status(200).json({ message: "Summary Excel Report generated successfully" });
})

module.exports = router;