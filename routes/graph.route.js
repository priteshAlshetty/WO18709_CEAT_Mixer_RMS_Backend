const express = require('express');
const router = express.Router();

const {
    getRecipeIdByDate,
    getSrNoByRecipeId,
    getBatchCountBySrno,
    getGraphDataByBatchNo
} = require('../controllers/graphs/graph.controller.js')

router.post('/getRecipeIdByDate', async (req, res) => {

    const { from, to } = req.body;

    if (!from || !to) {
        return res.status(400).json({
            status: false,
            error: "FROM_AND_TO_REQUIRED"
        });
    }

    try {
        const result = await getRecipeIdByDate({ from, to }, req.db.report);

        // Always 200 for valid request
        return res.status(200).json(result);

    } catch (err) {
        console.error(
            'Error in /getRecipeIdByDate endpoint:',
            err
        );

        return res.status(500).json({
            status: false,
            error: "INTERNAL_SERVER_ERROR"
        });
    }
});


router.post('/getSrNoByRecipeId', async (req, res) => {

    const { from, to, recipe_id } = req.body;

    if (!from || !to || !recipe_id) {
        return res.status(400).json({
            error: "missing required body parameters from and to, recipe_id"
        });
    }

    try {
        const result = await getSrNoByRecipeId({ from, to, recipe_id }, req.db.report);

        return res.status(200).json({ result });

    } catch (error) {
        console.error('Error at try catch block of endpoint /getSrNoByRecipeId ', error);
        return res.status(500).json({
            errMessage: "INTERNAL SERVER ERROR",
            status: false
        })

    }
})

router.post('/getBatchCountBySrno', async (req, res) => {

    const { from, to, recipe_id, sr_no } = req.body;

    if (!from || !to || !recipe_id || !sr_no) {
        return res.status(400).json({
            error: "missing required body parameters from and to, recipe_id,sr_no"
        });
    }

    try {
        const result = await getBatchCountBySrno({ sr_no, from, to, recipe_id }, req.db.report);

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error at try catch block of endpoint /getBatchCountBySrno ', error);
        return res.status(500).json({
            errMessage: "INTERNAL SERVER ERROR",
            status: false
        })

    }
})



router.post('/getGraphDataByBatchNo', async (req, res) => {

    const { from, to, recipe_id, sr_no, batch_no } = req.body;

    if (!from || !to || !recipe_id || !sr_no || !batch_no) {
        return res.status(400).json({
            error: "missing required body parameters from , to, recipe_id,sr_no, batch_no"
        });
    }

    try {
        const result = await getGraphDataByBatchNo({ sr_no, from, to, recipe_id, batch_no }, req.db.report);

        return res.status(200).json(result);

    } catch (error) {
        console.error('Error at try catch block of endpoint /getGraphDataByBatchNo ', error);
        return res.status(500).json({
            errMessage: "INTERNAL SERVER ERROR",
            status: false
        })

    }
})

module.exports = router;
