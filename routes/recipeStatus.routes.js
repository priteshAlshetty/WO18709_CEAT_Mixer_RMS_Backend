const {
    getRecipeStatus,
    updateRecipeStatus
} = require('../controllers/recipeStatus.controller');
const express = require('express');
const router = express.Router();

router.get("/getAllRecipeStatus", async (req, res) => {
    try {
        const rmsdb = req.db.rms;
        const result = await getRecipeStatus(rmsdb);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            errLocation: "GET /getAllRecipeStatus route handler.",
            error: error.message
        })
    }
});

router.post("/updateRecipeStatus", async (req, res) => {
    const { recipe_id, recipe_name, IsActivate } = req.body;
    const rmsdb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin", "supervisor"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to Enable/Disable recipe IDs.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }

    if (!recipe_id || !IsActivate) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }
    try {
        const result = await updateRecipeStatus(recipe_id, IsActivate, rmsdb);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            errLocation: "POST /updateRecipeStatus route handler.",
            error: error.message
        })
    }
});
module.exports = router;
