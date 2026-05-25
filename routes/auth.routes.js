const express = require("express");
const router = express.Router();
const { login, signup, updateUsername, getAuthLevel } = require("../controllers/auth/auth.controller");

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    login({ username, password })
        .then(result => res.json(result))
        .catch(err =>
            res.status(500).json({ success: false, Message: "An error occurred during login. Please try again later.", error: err.message }));
});

router.post("/signup", (req, res) => {
    const { username, password, auth_level } = req.body;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin", "supervisor", "operator"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to add new users.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    signup({ username, password, auth_level })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ success: false, Message: "An error occurred during signup. Please try again later.", error: err.message }));
});


module.exports = router;
