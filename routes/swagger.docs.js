/**
 * @swagger
 * tags:
 *   - name: Recipe
 *     description: APIs for managing recipes
 */

/**
 * @swagger
 * /recipe/allRecipeIds:
 *   get:
 *     summary: Get all Recipe IDs
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: Successfully fetched recipe IDs
 *       404:
 *         description: No Recipe IDs found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /recipe/checkRecipeExists/byId:
 *   post:
 *     summary: Check if recipe exists by ID
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe_id
 *             properties:
 *               recipe_id:
 *                 type: string
 *                 example: R001
 *     responses:
 *       200:
 *         description: Recipe exists
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Invalid or missing body
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /recipe/viewRecipe/byId:
 *   post:
 *     summary: View recipe details by ID
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe_id
 *             properties:
 *               recipe_id:
 *                 type: string
 *                 example: R001
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Invalid recipe ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /recipe/editRecipe/byId:
 *   post:
 *     summary: Edit existing recipe by ID
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe
 *             properties:
 *               recipe:
 *                 type: object
 *                 example:
 *                   recipe_id: R001
 *                   recipe_name: Rubber Mix A
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       400:
 *         description: Missing recipe object
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /recipe/addNewRecipe:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe
 *             properties:
 *               recipe:
 *                 type: object
 *                 example:
 *                   recipe_id: R002
 *                   recipe_name: Rubber Mix B
 *     responses:
 *       200:
 *         description: Recipe added successfully
 *       400:
 *         description: Recipe already exists or missing
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /recipe/deleteRecipe/byId:
 *   delete:
 *     summary: Delete recipe by ID
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe_id
 *             properties:
 *               recipe_id:
 *                 type: string
 *                 example: R001
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       400:
 *         description: Missing recipe ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /report/weighing/getExcelReport:
 *   post:
 *     summary: Generate weighing Excel report
 *     tags: [Weighing]
 *     description: APIs for Report generation
 *     responses:
 *       200:
 *         description: Weighing Excel Report generated successfully
 */


/**
 * @swagger
 * /batch/getBatchName/bydate:
 *   post:
 *     summary: Get batch names within a date range
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *             properties:
 *               from:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T00:00:00"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-02T23:59:59"
 *     responses:
 *       200:
 *         description: Successfully fetched batch names
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 BATCH_NAME:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: No batch names found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /batch/getSerial/byBatchName:
 *   post:
 *     summary: Get serial numbers by batch names and date range
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - batchName
 *               - from
 *               - to
 *             properties:
 *               batchName:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["MT671", "MT680"]
 *               from:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T00:00:00"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-02T23:59:59"
 *     responses:
 *       200:
 *         description: Serial numbers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SERIAL_NO:
 *                   type: array
 *                   items:
 *                     type: number
 *       400:
 *         description: Missing or invalid request fields
 *       404:
 *         description: No serial numbers found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /batch/getbatchNo/bySerialNo:
 *   post:
 *     summary: Get batch numbers by serial number
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serialNo
 *             properties:
 *               serialNo:
 *                 type: number
 *                 example: 1756
 *     responses:
 *       200:
 *         description: Batch numbers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 BATCH_NO:
 *                   type: array
 *                   items:
 *                     type: number
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: No batch numbers found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /batch/getExcelReport:
 *   post:
 *     summary: Generate Excel Batch Report for given parameters
 *     tags: [Batch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - serialNo
 *               - batchNo
 *               - dttmFrom
 *               - dttmTo
 *             properties:
 *               recipeId:
 *                 type: string
 *                 example: "MT671"
 *               serialNo:
 *                 type: number
 *                 example: 1756
 *               batchNo:
 *                 type: number
 *                 example: 1
 *               dttmFrom:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-01T00:00:00"
 *               dttmTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-02T23:59:59"
 *     responses:
 *       200:
 *         description: Excel Report generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reportPath:
 *                   type: string
 *                   example: "/reports/batch_report/BatchReport_1756_1.xlsx"
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */



/**
 * @swagger
 * /report/summary/getBatchName/byDate:
 *   post:
 *     summary: Get summary batch names by date
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: List of batch names
 */



/**
 * @swagger
 * /report/summary/getSerial/byBatchName:
 *   post:
 *     summary: Get summary serial numbers by batch name
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: List of serial numbers
 */



/**
 * @swagger
 * /report/summary/getExcelReport:
 *   post:
 *     summary: Generate summary Excel report
 *     tags: [Summary]
 *     responses:
 *       200:
 *         description: Summary Excel Report generated successfully
 */

