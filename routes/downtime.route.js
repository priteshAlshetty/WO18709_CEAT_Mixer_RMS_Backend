const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const {
    getDowntime,
    updateDowntime,
    deleteDowntime,
    addDowntime,
    generateDowntimeReport
} = require("../controllers/downtime.controller.js");

router.post('/getDowntime/byDateTime', async (req, res) => {
    try {
        const params = req.body;
        const { from, to } = params;
        if (!from || !to) {
            return res.status(400).json({ message: "Missing required parameters: from, to" });
        }
        const result = await getDowntime(params, req.db.rms);
        if (result.status) {
            return res.status(200).json({ downtime_data: result.downtime_data });
        }
        else {
            throw result.error;
        }
    }
    catch (error) {
        console.error("🔥 Error in /downtime/getDowntime/byDateTime", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", error });
    }
});

router.post('/updateDowntime', async (req, res) => {
    try {
        const params = req.body;
        const { downtime_data } = params;
        if (!downtime_data || !Array.isArray(downtime_data) || downtime_data.length === 0) {
            return res.status(400).json({ message: "Missing or invalid required parameter: downtime_data" });
        }
        const result = await updateDowntime(params, req.db.rms);
        if (result.status) {
            return res.status(200).json({ status: result.status, affectedRows: result.affectedRows });
        }
        else {
            throw result.error;
        }
    }
    catch (error) {
        console.error("🔥 Error in /downtime/updateDowntime", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", error });
    }
});
router.post('/deleteDowntime', async (req, res) => {
    try {
        const params = req.body;
        const { sr } = params;
        if (!sr) {
            return res.status(400).json({ message: "Missing required parameter: sr" });
        }
        const result = await deleteDowntime(params, req.db.rms);
        if (result.status) {
            return res.status(200).json({ status: result.status, affectedRows: result.affectedRows });
        }
        else {
            throw result.error;
        }
    }
    catch (error) {
        console.error("🔥 Error in /downtime/deleteDowntime", error)
        return res.status(500).json({ message: error.message || "Internal Server Error", error });
    }
});
router.post('/addDowntime', async (req, res) => {
    try {
        const params = req.body;
        const result = await addDowntime(params, req.db.rms);
        if (result.status) {
            return res.status(200).json({ status: result.status, insertedId: result.insertedId });
        }
        else {
            throw result.error;
        }

    } catch (error) {
        console.error("🔥 Error in /downtime/addDowntime", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", error });
    }


});
router.post('/generateReport', async (req, res) => {
    try {
        const params = req.body;
        const { from, to } = params;

        if (!from || !to) {

            return res.status(400).json({ message: "Missing required parameters: from, to" });
        }
        const result = await generateDowntimeReport(params, req.db.report);
        const reportPath = result.filePath;
        // validate file path
        if (!reportPath || !fs.existsSync(reportPath)) {
            console.error("❌ Report file not found at path:", reportPath);
            return res.status(500).json({ message: "Generated report file not found" });
        }

        if (result.status) {
            const downloadName = `DowntimeReport.xlsx`;

            return res.download(reportPath, downloadName, (err) => {
                if (err) {
                    console.error("❌ Error downloading file:", err);
                    throw err;
                }
            });
        }
        else {
            throw result.error;
        }

    } catch (error) {
        console.error("🔥 Error in /downtime/generateReport", error);
        return res.status(500).json({ message: error.message || "Internal Server Error", error });
    }
});

module.exports = router;



