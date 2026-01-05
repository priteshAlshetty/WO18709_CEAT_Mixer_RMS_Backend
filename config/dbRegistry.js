module.exports = {
    Mixer1: {
        rms: require("./mixer1/mixer1.mysql.rms"),
        report: require("./mixer1/mixer1.mysql.report")
    },
    Mixer2: {
        rms: require("./mixer2/mixer2.mysql.rms"),
        report: require("./mixer2/mixer2.mysql.report")
    }
    // mixer3 can be added here later
};
