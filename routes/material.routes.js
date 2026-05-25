const express = require('express');
const router = express.Router();
const {
    getAllMaterials,
    addMaterial,
    deleteMaterial,
    getDropdownMaterials
} = require('../controllers/material.controller.js');

// Route to get all materials
router.get('/getMaterials', async (req, res) => {
    const rmsDb = req.db.rms;
    const result = await getAllMaterials(rmsDb);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({
            errLocation: "getMaterials route",
            error: result.error
        });
    }
});

// Route to get dropdown materials
router.get('/getMaterials/options', async (req, res) => {
    const rmsDb = req.db.rms;
    const result = await getDropdownMaterials(rmsDb);
    if (result.success) {

        res.status(200).json(result);
    } else {
        res.status(500).json({
            errLocation: "getDropdownMaterials route",
            error: result.error,
            data: null
        });
    }
});

// Route to add a new material
router.post('/addMaterial', async (req, res) => {
    const materialData = req.body.material_data;
    const rmsDb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin", "supervisor"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions add material.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }

    if (!materialData || !materialData.material_code || !materialData.material_name || !materialData.material_type) {
        return res.status(400).json({
            errLocation: "addMaterial route - validation",
            error: "missing fields: material data. 'material_code', 'material_name', and 'material_type' are required."
        });
    }
    const result = await addMaterial(materialData, rmsDb);
    if (result.success) {
        res.status(201).json(result);
    } else {
        res.status(500).json({
            errLocation: "addMaterial route",
            error: result.error
        });
    }
});


router.delete('/deleteMaterial', async (req, res) => {
    const materialData = req.body.material_data;
    const rmsDb = req.db.rms;
    const user = req.user; // Access decoded token payload
    if (!user || !user.auth_level || !["admin", "supervisor"].includes(user.auth_level)) {
        return res.status(401).json({
            message: `Access denied. User : ${user ? user.username : 'Unknown'} Have Insufficient permissions to delete material.`,
            username: user ? user.username : null,
            auth_level: user ? user.auth_level : null
        });
    }
    console.log("Received deleteMaterial request for:", materialData);
    if (!materialData || !materialData.material_code) {
        return res.status(400).json({
            errLocation: "deleteMaterial route - validation",
            error: "missing fields: material data. 'material_code' is required."
        });
    }
    const result = await deleteMaterial(materialData, rmsDb);
    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(200).json({
            message: "No material found with code: " + materialData.material_code,
            errLocation: "deleteMaterial route",
            error: result.message
        });
    }
});

module.exports = router;
