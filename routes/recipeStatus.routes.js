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

    if (typeof recipe_id === 'undefined' || typeof IsActivate === 'undefined') {
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
