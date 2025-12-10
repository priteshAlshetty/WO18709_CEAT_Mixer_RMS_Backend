const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const { getDowntime, updateDowntime } = require("../controllers/downtime.controller.js");

router.post('/getDowntime/byDateTime', async (req, res) => {
    try {
        const params = req.body;
        const { from, to } = params;
        if (!from || !to) {
            return res.status(400).json({ message: "Missing required parameters: from, to" });
        }
        const result = await getDowntime(params);
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
        const result = await updateDowntime(params);
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

module.exports = router;



