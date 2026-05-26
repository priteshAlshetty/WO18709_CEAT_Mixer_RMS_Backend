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




module.exports = router;
