const fs = require('fs');
const path = require('path');

function clearAppLog() {
    const logFilePath = path.join(__dirname, 'logs', 'app.log');

    try {
        if (fs.existsSync(logFilePath)) {
            fs.truncateSync(logFilePath, 0);
            console.log('app.log cleared at startup');
        }
    } catch (err) {
        console.error('Failed to clear app.log', err);
    }
}

module.exports = clearAppLog;
