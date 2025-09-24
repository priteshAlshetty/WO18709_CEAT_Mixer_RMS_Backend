const db = require("../config/config.mysql.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotevn = require("dotenv");
dotevn.config();


const SECRET_KEY = process.env.SECRET_KEY || "secretkey0123456";

// Example users (replace with DB query)
const users = [
    { username: "admin", passwordHash: bcrypt.hashSync("1234", 10), role: "admin" },
    { username: "user", passwordHash: bcrypt.hashSync("pass", 10), role: "user" }
];

async function login(req, res) {
    const { username, password } = req.body;

    // 1. Find user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: "Invalid username !!" });
    }

    // 2. Compare password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        return res.status(401).json({ error: "Invalid username or password !!" });
    }

    // 3. Generate token
    const token = jwt.sign(
        { username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: "8h" } // token lifetime
    );

    // 4. Send response
    res.status(200).json({ token });
}

module.exports = { login };