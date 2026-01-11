const dbRegistry = require("../config/dbRegistry");

module.exports = (req, res, next) => {
    //Modify as per Mixer ID Header
    const mixerId = req.header("x-mixer-id"); // "Mixer1" | "Mixer2"

    if (!["Mixer1", "Mixer2"].includes(mixerId)) {
        return res.status(400).json({
            status: false,
            error: "INVALID_MIXER_ID"
        });
    }
    const key = mixerId;
    req.db = {
        rms: dbRegistry[key].rms,
        report: dbRegistry[key].report
    };

    req.mixerId = mixerId;

    next();
};
