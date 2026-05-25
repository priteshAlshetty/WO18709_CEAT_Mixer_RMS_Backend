const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    deleteUser,
    updateUserPassword,
    updateAuthLevel,
    updateUsername } = require("../controllers/auth/auth.controller");


router.get("/getAllUsers", async (req, res) => {
    const rmsDb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to view all users.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    try {
        const result = await getAllUsers(rmsDb);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching all users',
            error: error.message
        });
    }
});

router.post("/updatePassword", async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const rmsDb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to update password.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    updateUserPassword({ username, oldPassword, newPassword }, rmsDb)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ success: false, Message: "An error occurred during password update. Please try again later.", error: err.message }));
});

router.post("/updateAuthLevel", async (req, res) => {
    const { username, auth_level } = req.body;
    const rmsDb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to update auth level.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    updateAuthLevel({ username, auth_level }, rmsDb)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ success: false, Message: "An error occurred during auth level update. Please try again later.", error: err.message }));
});

router.get("/auth-level", (req, res) => {
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to fetch auth level.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    const { username } = req.query;
    getAuthLevel({ username })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ success: false, Message: "An error occurred during fetching auth level. Please try again later.", error: err.message }));
});

module.exports = router;