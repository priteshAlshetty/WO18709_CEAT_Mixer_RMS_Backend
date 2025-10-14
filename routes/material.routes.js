const express = require('express');     
const router = express.Router();    
const materialController = require('../controllers/material.controllers.js');

// Route to get all materials
router.get('/getMaterials', async (req, res) => {
    const result = await materialController.getAllMaterials();
    if (result.success) {
        res.json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

// Route to add a new material
router.post('/addMaterial', async (req, res) => {
    const materialData = req.body;
    const result = await materialController.addMaterial(materialData);
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

module.exports = router;

