const express = require('express');     
const router = express.Router();    
const{
    getAllMaterials,
    addMaterial         
} = require('../controllers/material.controller.js');

// Route to get all materials
router.get('/getMaterials', async (req, res) => {
    const result = await getAllMaterials();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({
            errLocation :"getMaterials route",
            error: result.error });
    }
});

// Route to add a new material
router.post('/addMaterial', async (req, res) => {
    const materialData = req.body.material_data;
    const result = await addMaterial(materialData);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ 
            errLocation :"addMaterial route",
            error: result.error });
    }
});

module.exports = router;

