const express = require('express');     
const router = express.Router();    
const{
    getAllMaterials,
    addMaterial,
    deleteMaterial    
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

    if (!materialData || !materialData.material_code || !materialData.material_name || !materialData.material_type) {
        return res.status(400).json({ 
            errLocation :"addMaterial route - validation",
            error: "missing fields: material data. 'material_code', 'material_name', and 'material_type' are required." });
    }
    const result = await addMaterial(materialData);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ 
            errLocation :"addMaterial route",
            error: result.error });
    }
});


router.delete('/deleteMaterial', async (req, res) => {
    const materialData = req.body.material_data;

    if (!materialData || !materialData.material_code) {
        return res.status(400).json({
            errLocation: "deleteMaterial route - validation",
            error: "missing fields: material data. 'material_code' is required."
        });
    }
    const result = await deleteMaterial(materialData);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(200).json({
            message : "No material found with code: " + materialData.material_code,
            errLocation: "deleteMaterial route",
            error: result.message
        });
    }
});

module.exports = router;

