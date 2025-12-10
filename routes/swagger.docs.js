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
 *     summary: Generate and download Material Weighing Excel Report
 *     description: Generates an Excel report using material weighing data filtered by date range and returns it as a downloadable file.
 *     tags: [Weighing]
 *        
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
 *                 example: "2025-11-01"
 *                 description: Start date of the weighing report range
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-30"
 *                 description: End date of the weighing report range
 *     responses:
 *       200:
 *         description: Excel Report generated successfully (file download)
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields (from, to)
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing 'from' or 'to' date"
 *       404:
 *         description: No weighing data found for selected date range
 *         content:
 *           application/json:
 *             example:
 *               message: "No material weighing data found for the selected date range"
 *       500:
 *         description: Server error while generating or sending Excel report
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *               error: "Error details here"
 */


/**
 * @swagger
 * /report/batch/getBatchName/bydate:
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
 *                 example: "2025-11-07"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07"
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
 * /report/batch/getSerial/byBatchName:
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
 *                 type: string
 *                 description: batch Name or "All" for all batches
 *                 example: "MT671"
 *               from:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-08"
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
 * /report/batch/getbatchNo/bySerialNo:
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
 * /report/batch/getExcelReport:
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
 *                 description: batch Name or "All" for all recipe ids
 *                 example: "MT671"
 *               serialNo:
 *                 type: number
 *                 description: integer or "All" for all serial nos
 *                 example: 1756
 *               batchNo:
 *                 type: number
 *                 description: integer or "All" for all batch nos
 *                 example: "All"
 *               dttmFrom:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07"
 *               dttmTo:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-07"
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
 * /report/summary/getBatchName/byDateTime:
 *   post:
 *     summary: Get batch/recipe names between datetime range
 *     tags:
 *       - Summary Report
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
 *                 example: "2025-11-01 00:00:00"
 *                 description: Start DateTime filter
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-01 23:59:59"
 *                 description: End DateTime filter
 *     responses:
 *       200:
 *         description: Successfully fetched batch/recipe names
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 BATCH_NAME:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["CLEANOUT", "TBM01", "MIXING01"]
 *       400:
 *         description: Missing date range values
 *       404:
 *         description: No batch names found for given period
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /report/summary/getSerial/byBatchName:
 *   post:
 *     summary: Get serial numbers for a batch within datetime range
 *     tags:
 *       - Summary Report
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
 *                 example: "2025-11-01 00:00:00"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-01 23:59:59"
 *               batch_name:
 *                 type: string
 *                 example: "CLEANOUT"
 *     responses:
 *       200:
 *         description: Successfully fetched serial numbers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SERIAL_NO:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [2042, 2043, 2044, 2045]
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: No serial numbers found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /report/summary/getExcelReport:
 *   post:
 *     summary: Generate summary Excel report and download file
 *     tags:
 *       - Summary Report
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
 *                 example: "2025-11-01 00:00:00"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-01 23:59:59"
 *               batch_name:
 *                 type: string
 *                 example: "CLEANOUT"
 *               serial_no:
 *                 type: integer
 *                 example: 2042
 *     responses:
 *       200:
 *         description: Excel file download
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
 *     summary: Generate Cleanout Report (Excel)
 *     description: |
 *       Generates a Cleanout Excel report for the given date range.  
 *       The report includes all CLEANOUT recipe material entries logged in `report_material_log`.  
 *       Returns the generated Excel file as a download.
 *
 *     tags:
 *       - Cleanout Reports
 *
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
 *                 example: "2025-11-18"
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-11-19"
 *
 *     responses:
 *       200:
 *         description: Excel report successfully generated and downloaded.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       400:
 *         description: Missing input fields
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing 'from' or 'to' date"
 *
 *       404:
 *         description: No data found for the given date range
 *         content:
 *           application/json:
 *             example:
 *               message: "No CleanoutReport data found for the selected date range"
 *
 *       500:
 *         description: Internal server or file generation error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 *               error: "Error details"
 */
/**
 * @swagger
 * /shiftPlan/getExcelReport/complete:
 *   post:
 *     summary: Generate and download Shift Plan Execution Excel Report
 *     tags:
 *       - SHIFT PLAN REPORTS
 *     description: |
 *       Generates an Excel report of the shift plan execution for the given date range.
 *       The report includes Date, Time, Shift, Serial no, Recipe name, Set Batch, Finished Batch, and Username.
 *       Returns the Excel file if data exists; otherwise returns appropriate error messages.
 * 
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
 *                 description: Start date for filtering (YYYY-MM-DD)
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-20"
 *                 description: End date for filtering (YYYY-MM-DD)
 * 
 *     responses:
 *       200:
 *         description: Excel report successfully generated and downloaded.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 * 
 *       400:
 *         description: Missing required date parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing 'from' or 'to' date"
 * 
 *       404:
 *         description: No shift plan execution data found for selected date range.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No Shift plan execution data found for the selected date range"
 * 
 *       500:
 *         description: Internal server error while generating or downloading report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ERR: Internal Server Error"
 *                 errLoc:
 *                   type: string
 *                   example: "At try catch block of route /shiftPlanReport/getExcelReport/complete"
 *                 error:
 *                   type: string
 *                   example: "Unexpected error occurred"
 */

/**
 * @swagger
 * /production/getExcelReport/complete:
 *   post:
 *     summary: Generate and download the complete Production Excel Report
 *     description: >
 *       Generates a production report Excel file based on the provided date range.
 *       The system calculates cycle time and BWB time for each batch and returns an Excel file.
 *
 *     tags:
 *       - Production Reports
 *
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
 *                 description: Start date (YYYY-MM-DD)
 *               to:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-24"
 *                 description: End date (YYYY-MM-DD)
 *
 *     responses:
 *       200:
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *
 *       400:
 *         description: Missing date input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Missing 'from' or 'to' date"
 *
 *       404:
 *         description: No production data found for the given range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "No production data found for the selected date range"
 *
 *       500:
 *         description: Internal server error while generating or sending the report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "ERR: Internal Server Error"
 *                 errLoc: "At try catch block of route /production/getExcelReport/complete"
 *                 error: "Error details"
 */

/**
 * @swagger
 * /material/getMaterials:
 *   get:
 *     summary: Get all materials
 *     description: Returns the complete list of materials stored in the database.
 *     tags:
 *       - Material Manager
 *     responses:
 *       200:
 *         description: Successfully retrieved materials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   material_code:
 *                     type: string
 *                   material_name:
 *                     type: string
 *                   material_type:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /material/addMaterial:
 *   post:
 *     summary: Add a new material
 *     description: Creates a new material entry in the system.
 *     tags:
 *       - Material Manager
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
 *                     example: "CB01"
 *                   material_name:
 *                     type: string
 *                     example: "Carbon Black"
 *                   material_type:
 *                     type: string
 *                     example: "Raw Material"
 *     responses:
 *       201:
 *         description: Material created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /material/deleteMaterial:
 *   delete:
 *     summary: Delete a material
 *     description: Deletes a material based on the provided material_code.
 *     tags:
 *       - Material Manager
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
 *                     example: "CB01"
 *     responses:
 *       200:
 *         description: Material deleted or not found
 *       400:
 *         description: Missing material_code field
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /downtime/getDowntime/byDateTime:
 *   post:
 *     summary: Fetch downtime records between a given datetime range
 *     tags:
 *       - Downtime
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
 *                 description: Start datetime (UTC or ISO format)
 *               to:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-12T23:59:59.000Z"
 *                 description: End datetime (UTC or ISO format)
 *     responses:
 *       200:
 *         description: Downtime data returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 downtime_data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sr:
 *                         type: integer
 *                         example: 1
 *                       DTTM:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10 08:15:00"
 *                       shift:
 *                         type: string
 *                         example: "A"
 *                       downtime_start:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10 08:15:00"
 *                       downtime_stop:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10 08:25:00"
 *                       error_code:
 *                         type: string
 *                         example: "E101"
 *                       category:
 *                         type: string
 *                         example: "Mechanical"
 *                       sub_category:
 *                         type: string
 *                         example: "Gearbox"
 *                       current_login:
 *                         type: string
 *                         example: "operator01"
 *                       description:
 *                         type: string
 *                         example: "Gearbox overheating"
 *       400:
 *         description: Missing required parameters (from, to)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /downtime/updateDowntime:
 *   post:
 *     summary: Update downtime records in bulk
 *     tags:
 *       - Downtime
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
 *                 description: Array of downtime objects to update
 *                 items:
 *                   type: object
 *                   required:
 *                     - sr
 *                     - DTTM
 *                     - shift
 *                     - downtime_start
 *                     - downtime_stop
 *                     - error_code
 *                     - category
 *                     - sub_category
 *                     - current_login
 *                     - description
 *                   properties:
 *                     sr:
 *                       type: integer
 *                       example: 1
 *                       description: Primary key of downtime record (used for update)
 *                     DTTM:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-10 08:15:00"
 *                     shift:
 *                       type: string
 *                       example: "A"
 *                     downtime_start:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-10 08:15:00"
 *                     downtime_stop:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-10 08:25:00"
 *                     error_code:
 *                       type: string
 *                       example: "E101"
 *                     category:
 *                       type: string
 *                       example: "Mechanical"
 *                     sub_category:
 *                       type: string
 *                       example: "Gearbox"
 *                     current_login:
 *                       type: string
 *                       example: "operator01"
 *                     description:
 *                       type: string
 *                       example: "Gearbox overheating"
 *     responses:
 *       200:
 *         description: Downtime records updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 affectedRows:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Missing or invalid downtime_data
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /downtime/deleteDowntime:
 *   post:
 *     summary: Delete a downtime record by SR number
 *     tags:
 *       - Downtime
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
 *                 description: SR identifier of the downtime record to delete
 *     responses:
 *       200:
 *         description: Downtime deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: object
 *                   example:
 *                     affectedRows: 1
 *                     warningCount: 0
 *       400:
 *         description: Missing or invalid SR value
 *       404:
 *         description: No record found to delete
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /downtime/addDowntime:
 *   post:
 *     summary: Add a new downtime entry
 *     tags:
 *       - Downtime
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
 *             properties:
 *               downtime_start:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-10 08:15:00"
 *               downtime_stop:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-02-10 08:25:00"
 *               error_code:
 *                 type: string
 *                 example: "E101"
 *               category:
 *                 type: string
 *                 example: "Mechanical"
 *               sub_category:
 *                 type: string
 *                 example: "Gearbox"
 *               description:
 *                 type: string
 *                 example: "Gearbox overheating"
 *     responses:
 *       200:
 *         description: Downtime record added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: object
 *                   example:
 *                     insertId: 15
 *                     affectedRows: 1
 *                     warningCount: 0
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /downtime/generateReport:
 *   post:
 *     summary: Generate an Excel report for downtime within a datetime range
 *     tags:
 *       - Downtime
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
 *         description: Excel report generated successfully
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required date range
 *       500:
 *         description: Internal server error
 */
