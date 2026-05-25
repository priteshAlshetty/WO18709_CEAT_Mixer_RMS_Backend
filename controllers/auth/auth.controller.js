const db = require("../../config/auth/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;



async function getAllUsers() {
    const users = await db.query("SELECT * FROM users").then(([rows]) => rows).catch(err => {
        console.error("Error fetching users from database:", err);
        return [];
    });
    return users;
}
async function login(params) {
    const { username, password } = params;
    try {
        if (!username || !password) {
            return ({ success: false, error: "Username and password are required !!" });
        }


        // 1. Find user
        const users = await getAllUsers();

        const user = users.find(u => u.user_name === username);
        if (!user) {
            return ({ success: false, error: "Invalid username !!" });
        }

        // 2. Compare password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return ({ success: false, error: "Invalid username or password !!" });
        }

        // 3. Generate token
        const token = jwt.sign(
            { username: user.user_name, auth_level: user.auth_level },
            SECRET_KEY,
            { expiresIn: "1h" } // token lifetime
        );

        // 4. return
        return ({ success: true, token });
    } catch (err) {
        console.error("Error during login:", err);
        return ({ success: false, error: "An error occurred during login. Please try again later." });

    }
}
async function signup(params) {

    const { username, password, auth_level } = params;
    try {
        if (!username || !password || !auth_level) {
            return ({ success: false, error: "Username, password and auth level are required !!" });
        }
        // Check if user already exists
        const users = await getAllUsers();
        const existingUser = users.find(u => u.user_name === username);
        if (existingUser) {
            return ({ success: false, error: "Username already exists !!" });
        }
        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        await db.query("INSERT INTO users (user_name, passwordHash, password, auth_level) VALUES (?, ?, ?, ?)", [username, passwordHash, password, auth_level]);

        return ({ success: true, message: `User ${username} With Auth Level: ${auth_level} created successfully, login by using your credentials` });
    }
    catch (err) {
        console.error("Error during signup:", err);
        return ({ success: false, error: "An error occurred during signup. Please try again later." });

    }
}
async function deleteUser(params) {
    const { username } = params;
    try {
        const [result] = await db.query("DELETE FROM users WHERE user_name = ?", [username]);
        if (result.affectedRows === 0) {
            return ({ success: false, error: "User not found !!" });
        } else {
            return ({ success: true, message: "User deleted successfully !!" });
        }

    }
    catch (err) {
        console.error("Error during user deletion:", err);
        return ({ success: false, error: "An error occurred during user deletion. Please try again later." });
    }
}
async function updateUserPassword(params) {
    const { username, oldPassword, newPassword } = params;
    try {
        const users = await getAllUsers();
        const user = users.find(u => u.user_name === username);
        if (!user) {
            return ({ success: false, error: "User not found !!" });
        }
        const validPassword = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!validPassword) {
            return ({ success: false, error: "Invalid old password !!" });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        const [result] = await db.query("UPDATE users SET passwordHash = ?, password = ? WHERE user_name = ?", [passwordHash, newPassword, username]);
        if (result.affectedRows === 0) {
            return ({ success: false, error: "User not found !!" });
        }
        return ({ success: true, message: "Password updated successfully !!" });
    } catch (err) {
        console.error("Error during password update:", err);
        return ({ success: false, error: "An error occurred during password update. Please try again later." });
    }
}
async function updateAuthLevel(params) {
    const { username, auth_level } = params;
    try {
        const users = await getAllUsers();
        const user = users.find(u => u.user_name === username);
        if (!user) {
            return ({ success: false, error: "User not found !!" });
        }
        const [result] = await db.query("UPDATE users SET auth_level = ? WHERE user_name = ?", [auth_level, username]);
        if (result.affectedRows === 0) {
            return ({ success: false, error: "User not found !!" });
        }
        return ({ success: true, message: "Auth level updated successfully !!" });
    }
    catch (err) {
        console.error("Error during auth level update:", err);
        return ({ success: false, error: "An error occurred during auth level update. Please try again later." });
    }
}
async function updateUsername(params) {
    const { oldUsername, newUsername } = params;
    try {
        const users = await getAllUsers();
        const user = users.find(u => u.user_name === oldUsername);
        if (!user) {
            return ({ success: false, error: "User not found !!" });
        }
        const existingUser = users.find(u => u.user_name === newUsername);
        if (existingUser) {
            return ({ success: false, error: "New username already exists !!" });
        }
        const [result] = await db.query("UPDATE users SET user_name = ? WHERE user_name = ?", [newUsername, oldUsername]);
        if (result.affectedRows === 0) {
            return ({ success: false, error: "User not found !!" });
        }
        return ({ success: true, message: "Username updated successfully !!" });
    } catch (err) {
        console.error("Error during username update:", err);
        return ({ success: false, error: "An error occurred during username update. " });
    }
}
async function getAuthLevel(params) {
    const { username } = params;
    try {
        const [result] = await db.query("SELECT auth_level FROM users WHERE user_name = ?", [username]);
        if (result.length === 0) {
            return ({ success: false, error: "User not found !!" });
        } else {
            return ({ success: true, auth_level: result[0].auth_level });
        }
    } catch (err) {
        console.error("Error during fetching auth level:", err);
        return ({ success: false, error: "An error occurred during fetching auth level. " });
    }
}



module.exports = { login, signup, getAllUsers, deleteUser, updateUserPassword, updateAuthLevel, updateUsername };