/**
 * @swagger
 * tags:
 *   - name: Recipe
 *     description: APIs for managing recipes
 *   - name: Weighing
 *     description: APIs for material weighing reports
 *   - name: Batch
 *     description: APIs for batch reports
 *   - name: Summary Report
 *     description: APIs for summary reports
 *   - name: Cleanout Reports
 *     description: APIs for generating cleanout reports
 *   - name: SHIFT PLAN REPORTS
 *     description: APIs for generating shift plan execution reports
 *   - name: Production Reports
 *     description: APIs for generating production reports
 *   - name: Material Manager
 *     description: APIs for managing materials
 *   - name: Downtime
 *     description: APIs for fetching downtime records
 *   - name: Authentication
 *     description: APIs for authentication and user management
 *   - name: User Management
 *     description: APIs for user administration
 *   - name: Alarms
 *     description: Alarm report APIs
 *   - name: Graph
 *     description: Graph and trend APIs
 *   - name: Recipe Status
 *     description: Recipe activation status APIs
 */


/**
 * @swagger
 * /recipe/allRecipeIds:
 *   get:
 *     summary: Get all recipe IDs
 *     description: Retrieves all available recipe IDs from the RMS system.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
 *     responses:
 *       200:
 *         description: Recipe IDs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 recipeIds:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - R001
 *                     - R002
 *                     - R003
 *       404:
 *         description: No recipe IDs found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipe/checkRecipeExists/byId:
 *   post:
 *     summary: Check recipe existence
 *     description: Checks whether a recipe exists for the given recipe ID.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipe/viewRecipe/byId:
 *   post:
 *     summary: View recipe details
 *     description: Retrieves complete recipe details for a given recipe ID.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *         description: Recipe details fetched successfully
 *       404:
 *         description: Recipe not found
 *       400:
 *         description: Invalid recipe ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipe/editRecipe/byId:
 *   post:
 *     summary: Edit recipe
 *     description: Updates an existing recipe using the supplied recipe object.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipe/addNewRecipe:
 *   post:
 *     summary: Add new recipe
 *     description: Creates a new recipe in the RMS system.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *         description: Recipe created successfully
 *       400:
 *         description: Recipe already exists or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipe/deleteRecipe/byId:
 *   delete:
 *     summary: Delete recipe
 *     description: Deletes a recipe using recipe ID.
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/weighing/getExcelReport:
 *   post:
 *     summary: Generate weighing Excel report
 *     description: Generates and downloads an Excel report for material weighing data within a date range.
 *     tags:
 *       - Weighing
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 format: date
 *                 example: "2025-11-01"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-30"
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing date range
 *       404:
 *         description: No weighing data found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /report/batch/getBatchName/bydate:
 *   post:
 *     summary: Get batch names
 *     description: Retrieves batch names within the specified date range.
 *     tags:
 *       - Batch
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 format: date
 *                 example: "2025-11-07"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-07"
 *     responses:
 *       200:
 *         description: Batch names fetched successfully
 *       400:
 *         description: Missing date parameters
 *       404:
 *         description: No batch names found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/batch/getSerial/byBatchName:
 *   post:
 *     summary: Get serial numbers by batch name
 *     description: Retrieves serial numbers for a given batch name within a date range.
 *     tags:
 *       - Batch
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 type: string
 *                 example: "MT671"
 *               from:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-07"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-08"
 *     responses:
 *       200:
 *         description: Serial numbers fetched successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No serial numbers found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/batch/getbatchNo/bySerialNo:
 *   post:
 *     summary: Get batch numbers by serial number
 *     description: Retrieves batch numbers associated with a serial number.
 *     tags:
 *       - Batch
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 type: integer
 *                 example: 1756
 *     responses:
 *       200:
 *         description: Batch numbers fetched successfully
 *       400:
 *         description: Missing serial number
 *       404:
 *         description: No batch numbers found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/batch/getExcelReport:
 *   post:
 *     summary: Generate batch Excel report
 *     description: Generates batch report Excel file based on selected filters.
 *     tags:
 *       - Batch
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 oneOf:
 *                   - type: integer
 *                   - type: string
 *                 example: 1756
 *               batchNo:
 *                 oneOf:
 *                   - type: integer
 *                   - type: string
 *                 example: "All"
 *               dttmFrom:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07T00:00:00"
 *               dttmTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07T23:59:59"
 *     responses:
 *       200:
 *         description: Batch report generated successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/summary/getBatchName/byDateTime:
 *   post:
 *     summary: Get batch names for summary report
 *     description: Retrieves batch names between selected datetime range.
 *     tags:
 *       - Summary Report
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 example: "2025-12-01T23:59:59"
 *     responses:
 *       200:
 *         description: Batch names fetched successfully
 *       400:
 *         description: Missing date range
 *       404:
 *         description: No records found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/summary/getSerial/byBatchName:
 *   post:
 *     summary: Get serial numbers for summary report
 *     description: Retrieves serial numbers for a batch within selected datetime range.
 *     tags:
 *       - Summary Report
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - batch_name
 *             properties:
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               batch_name:
 *                 type: string
 *                 example: "CLEANOUT"
 *     responses:
 *       200:
 *         description: Serial numbers fetched successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: No serial numbers found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/summary/getExcelReport:
 *   post:
 *     summary: Generate summary Excel report
 *     description: Generates downloadable summary report Excel file.
 *     tags:
 *       - Summary Report
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - batch_name
 *               - serial_no
 *             properties:
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               batch_name:
 *                 type: string
 *               serial_no:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cleanoutReport/byDate:
 *   post:
 *     summary: Generate cleanout Excel report
 *     description: Generates a downloadable Excel report containing cleanout recipe material entries for the selected date range.
 *     tags:
 *       - Cleanout Reports
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
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
 *                 format: date
 *                 example: "2025-11-18"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-19"
 *     responses:
 *       200:
 *         description: Cleanout report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing date range
 *       404:
 *         description: No cleanout data found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /shiftPlan/getExcelReport/complete:
 *   post:
 *     summary: Generate shift plan execution report
 *     description: Generates and downloads Excel report for shift plan execution data within selected date range.
 *     tags:
 *       - SHIFT PLAN REPORTS
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
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
 *                 format: date
 *                 example: "2025-11-19"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-20"
 *     responses:
 *       200:
 *         description: Shift plan report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing date range
 *       404:
 *         description: No shift plan data found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/production/getExcelReport/complete:
 *   post:
 *     summary: Generate production Excel report
 *     description: Generates downloadable production Excel report for selected date range.
 *     tags:
 *       - Production Reports
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
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
 *                 format: date
 *                 example: "2025-11-20"
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-24"
 *     responses:
 *       200:
 *         description: Production report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing date range
 *       404:
 *         description: No production data found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /material/getMaterials:
 *   get:
 *     summary: Get all materials
 *     description: Retrieves all material records from the RMS database.
 *     tags:
 *       - Material Manager
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
 *     responses:
 *       200:
 *         description: Materials fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   material_code:
 *                     type: string
 *                     example: CB01
 *                   material_name:
 *                     type: string
 *                     example: Carbon Black
 *                   material_type:
 *                     type: string
 *                     example: Raw Material
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /material/addMaterial:
 *   post:
 *     summary: Add material
 *     description: Adds a new material record into the RMS system.
 *     tags:
 *       - Material Manager
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - material_data
 *             properties:
 *               material_data:
 *                 type: object
 *                 required:
 *                   - material_code
 *                   - material_name
 *                   - material_type
 *                 properties:
 *                   material_code:
 *                     type: string
 *                     example: CB01
 *                   material_name:
 *                     type: string
 *                     example: Carbon Black
 *                   material_type:
 *                     type: string
 *                     example: Raw Material
 *     responses:
 *       201:
 *         description: Material created successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /material/deleteMaterial:
 *   delete:
 *     summary: Delete material
 *     description: Deletes a material based on material code.
 *     tags:
 *       - Material Manager
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - material_data
 *             properties:
 *               material_data:
 *                 type: object
 *                 required:
 *                   - material_code
 *                 properties:
 *                   material_code:
 *                     type: string
 *                     example: CB01
 *     responses:
 *       200:
 *         description: Material deleted successfully
 *       400:
 *         description: Missing material code
 *       404:
 *         description: Material not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/getDowntime/byDateTime:
 *   post:
 *     summary: Fetch downtime records
 *     description: Retrieves downtime records within selected datetime range.
 *     tags:
 *       - Downtime
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 example: "2025-02-09T00:00:00.000Z"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-12T23:59:59.000Z"
 *     responses:
 *       200:
 *         description: Downtime data fetched successfully
 *       400:
 *         description: Missing datetime range
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/updateDowntime:
 *   post:
 *     summary: Update downtime records
 *     description: Updates one or more downtime records in bulk.
 *     tags:
 *       - Downtime
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - downtime_data
 *             properties:
 *               downtime_data:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Downtime updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/deleteDowntime:
 *   post:
 *     summary: Delete downtime record
 *     description: Deletes a downtime record using SR number.
 *     tags:
 *       - Downtime
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sr
 *             properties:
 *               sr:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Downtime deleted successfully
 *       400:
 *         description: Missing SR number
 *       404:
 *         description: Record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/addDowntime:
 *   post:
 *     summary: Add downtime record
 *     description: Creates a new downtime record.
 *     tags:
 *       - Downtime
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - downtime_start
 *               - downtime_stop
 *               - error_code
 *               - category
 *               - sub_category
 *               - description
 *     responses:
 *       200:
 *         description: Downtime record added successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/generateReport:
 *   post:
 *     summary: Generate downtime report
 *     description: Generates downloadable Excel report for downtime records.
 *     tags:
 *       - Downtime
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *     responses:
 *       200:
 *         description: Report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing date range
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /report/alarm/generateReport:
 *   post:
 *     summary: Generate alarm report
 *     description: Generates downloadable Excel report for alarm records within selected datetime range.
 *     tags:
 *       - Alarms
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
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
 *                 example: "2025-02-10T00:00:00Z"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-12T23:59:59Z"
 *     responses:
 *       200:
 *         description: Alarm report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing datetime range
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /graph/getRecipeIdByDate:
 *   post:
 *     summary: Get recipe IDs by date range
 *     description: Retrieves distinct recipe IDs within selected datetime range.
 *     tags:
 *       - Graph
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
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
 *                 example: "2026-01-01T02:30:10.000Z"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-01-02T02:30:10.000Z"
 *     responses:
 *       200:
 *         description: Recipe IDs fetched successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /graph/getSrNoByRecipeId:
 *   post:
 *     summary: Get serial numbers by recipe ID
 *     description: Retrieves serial numbers for a selected recipe within date range.
 *     tags:
 *       - Graph
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - recipe_id
 *             properties:
 *               from:
 *                 type: string
 *                 format: date-time
 *               to:
 *                 type: string
 *                 format: date-time
 *               recipe_id:
 *                 type: string
 *                 example: "MT0112"
 *     responses:
 *       200:
 *         description: Serial numbers fetched successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /graph/getBatchCountBySrno:
 *   post:
 *     summary: Get batch count
 *     description: Retrieves total batch count for selected recipe and serial number.
 *     tags:
 *       - Graph
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - recipe_id
 *               - sr_no
 *     responses:
 *       200:
 *         description: Batch count fetched successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /graph/getGraphDataByBatchNo:
 *   post:
 *     summary: Get graph data
 *     description: Retrieves graph trend data for selected batch.
 *     tags:
 *       - Graph
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - recipe_id
 *               - sr_no
 *               - batch_no
 *     responses:
 *       200:
 *         description: Graph data fetched successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipeStatus/getAllRecipeStatus:
 *   get:
 *     summary: Get all recipe statuses
 *     description: Retrieves recipe activation status records.
 *     tags:
 *       - Recipe Status
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     responses:
 *       200:
 *         description: Recipe statuses fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /recipeStatus/updateRecipeStatus:
 *   post:
 *     summary: Update recipe status
 *     description: Updates activation status for a recipe.
 *     tags:
 *       - Recipe Status
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipe_id
 *               - recipe_name
 *               - IsActivate
 *             properties:
 *               recipe_id:
 *                 type: string
 *                 example: TRIAL004
 *               recipe_name:
 *                 type: string
 *                 example: "001"
 *               IsActivate:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Recipe status updated successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with username and password and returns login result.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *         description: Mixer identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account. Only admin users can access this endpoint.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - auth_level
 *             properties:
 *               username:
 *                 type: string
 *                 example: operator1
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePass123
 *               auth_level:
 *                 type: string
 *                 enum: [admin, supervisor, operator]
 *                 example: operator
 *     responses:
 *       200:
 *         description: User created successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : john Have Insufficient permissions to add new users."
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : operator1 Have Insufficient permissions to view all users."
 *                 username:
 *                   type: string
 *                 auth_level:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/deleteUser:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user account by username. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: operator1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : supervisor1 Have Insufficient permissions to delete users."
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/updatePassword:
 *   post:
 *     summary: Update user password
 *     description: Updates a user's password. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: operator1
 *               oldPassword:
 *                 type: string
 *                 format: password
 *               newPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid password
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : operator1 Have Insufficient permissions to update password."
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/updateAuthLevel:
 *   post:
 *     summary: Update user authorization level
 *     description: Updates user auth level. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - auth_level
 *             properties:
 *               username:
 *                 type: string
 *               auth_level:
 *                 type: string
 *                 enum: [admin, supervisor, operator]
 *     responses:
 *       200:
 *         description: Auth level updated
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : operator1 Have Insufficient permissions to update auth level."
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /auth/updateUsername:
 *   post:
 *     summary: Update username
 *     description: Updates an existing user's username. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - newUsername
 *             properties:
 *               username:
 *                 type: string
 *                 example: operator1
 *               newUsername:
 *                 type: string
 *                 example: operator2
 *     responses:
 *       200:
 *         description: Username updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : supervisor1 Have Insufficient permissions to update username."
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/auth-level:
 *   get:
 *     summary: Get user authorization level
 *     description: Retrieves the authorization level of a specified user. Only admin users can access this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-mixer-id
 *         required: true
 *         schema:
 *           type: string
 *           example: Mixer1
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: operator1
 *         description: Username whose authorization level needs to be fetched
 *     responses:
 *       200:
 *         description: Authorization level fetched successfully
 *       400:
 *         description: Missing username parameter
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access denied. User : supervisor1 Have Insufficient permissions to fetch auth level."
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */