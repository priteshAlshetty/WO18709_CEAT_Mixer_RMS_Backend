const fs = require("fs");
const path = require("path");

async function logAction(params, db) {

    try {
        const [rows] = await db.query(
            `INSERT INTO operator_log(DTTM, operator_name, operator_authorization, action, Description) 
            VALUES (NOW(), ?, ?, ?, ?)`,
            [params.operator_name, params.operator_authorization, params.action, JSON.stringify(params.Description)]
        );
        if (rows.affectedRows === 1) {
            // console.log('Action logged successfully');
            return true;
        } else {
            throw new Error('Failed to log action');
        }
    } catch (error) {
        console.error('Error logging action:', error);
        throw error;
    }
}

async function getLogs(params, db) {
    try {
        const [rows] = await db.query(
            `SELECT * FROM operator_log WHERE DTTM BETWEEN ? AND ? ORDER BY DTTM DESC`,
            [params.from, params.to]
        );

        if (rows.length === 0) {
            return {
                success: false,
                message: "No logs found for the specified date range"
            };
        }

        let csv = Object.keys(rows[0]).join(",") + "\r\n";

        for (const row of rows) {
            const values = Object.keys(rows[0]).map((header) => {
                let value = row[header];

                if (value === null || value === undefined)
                    return "";

                if (typeof value === "object") {
                    value = JSON.stringify(value);
                }

                value = String(value);
                value = value.replace(/"/g, '""');

                return `"${value}"`;
            });

            csv += values.join(",") + "\r\n";
        }

        const filePath = path.join(
            __dirname,
            "reports",
            "operator_log",
            "operator_logs.csv"
        );

        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        fs.writeFileSync(filePath, csv, "utf8");

        return {
            status: true,
            filePath
        };

    } catch (error) {
        console.error("Error retrieving logs:", error);
        throw error;
    }
}

module.exports = {
    logAction,
    getLogs
};
