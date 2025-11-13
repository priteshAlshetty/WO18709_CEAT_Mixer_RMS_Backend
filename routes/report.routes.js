const express = require('express');
const router = express.Router();


router.post('/weighing/getExcelReport', async(req,res) => {
res.status(200).json({message: "Weighing Excel Report generated successfully"});
})

router.post('/batch/getBatchName/bydate', async(req,res) =>{
res.status(200).json({BATCH_NAME: ['MT001', 'MT002', 'MT003']});
})

router.post('/batch/getSerial/byBatchName', async(req,res) =>{
res.status(200).json({SERIAL_NO: ['1452', '1453', '1454']});
})

router.post('/batch/getbatchNo/bySerialNo', async(req,res) =>{
res.status(200).json({BATCH_NO: [1,2,3,4,5,6,7,8,9,10]});
})
router.post('/batch/getExcelReport', async(req,res) =>{
res.status(200).json({message: "Batch Excel Report generated successfully"});
})

router.post('/summary/getBatchName/byDate', async(req,res) =>{
res.status(200).json({BATCH_NAME: ['MT051', 'MT052', 'MT053']});
})

router.post('/summary/getSerial/byBatchName', async(req,res) =>{
res.status(200).json({SERIAL_NO: ['1952', '1953', '1954']});
})

router.post('/summary/getExcelReport', async(req,res) =>{
res.status(200).json({message: "Summary Excel Report generated successfully"});
})

module.exports = router;