const db = require("../config/config.mysql.js");
const getMySQLTimestamp = require("../utils/timestamp.helper.js").getMySQLTimestamp;

/**
 * Checks if a recipe exists in both mixing and weighing tables of the database
 * 
 * @async
 * @param {string|number} recipe_id - The recipe ID to check for existence
 * @returns {Promise<Object>} An object containing existence flags:
 *   - mixingExists {boolean} - True if recipe exists in mixing table
 *   - weighingExists {boolean} - True if recipe exists in weighing table
 * @throws {Error} If database connection or query fails
 * @example
 * try {
 *   const exists = await checkRecipeExists('RECIPE001');
 *   console.log(exists); // { mixingExists: true, weighingExists: true }
 * } catch (error) {
 *   console.error('Failed to check recipe:', error);
 * }
 */

async function checkRecipeExists(recipe_id) {
    const conn = await db.getConnection();
    try {
        const [mixing] = await conn.query("SELECT COUNT(*) as count FROM recipe_mixing WHERE recipe_id = ?", [recipe_id]);
        const [weighing] = await conn.query("SELECT COUNT(*) as count FROM recipe_weighing WHERE recipe_id = ?", [recipe_id]);
        return {
            mixingExists: mixing[0].count > 0,
            weighingExists: weighing[0].count > 0
        }

    } catch (error) {
        console.error("Error checking recipe existence:", error);
        throw error;
    } finally {
        conn.release();
    }
}

/**
 * Retrieves complete recipe data from multiple database tables by recipe ID
 * 
 * @async
 * @param {string|number} recipeId - The unique identifier of the recipe to retrieve
 * @returns {Promise<Object>} Complete recipe data object containing:
 *   - success {boolean} - Indicates if recipe was found
 *   - message {string} - Error message if recipe not found
 *   - recipe_id {string|number} - The requested recipe ID
 *   - recipe_mixing {Array} - Mixing steps and parameters
 *   - recipe_weighing {Object} - Weighing parameters and settings
 *   - recipe_weight_CB {Array} - Carbon black material weights
 *   - recipe_weight_poly {Array} - Polymer material weights  
 *   - recipe_weight_oil_a {Array} - Oil A material weights
 *   - recipe_weight_oil_b {Array} - Oil B material weights
 *   - recipe_weight_PD {Array} - Chemical PD material weights
 *   - recipe_weight_silica {Array} - Silica material weights
 *   - recipe_weight_filler {Array} - Filler material weights
 * @throws {Error} If database queries fail
 * @example
 * try {
 *   const recipe = await getRecipeById('RECIPE001');
 *   if (recipe.success) {
 *     console.log('Recipe found:', recipe);
 *   } else {
 *     console.log(recipe.message);
 *   }
 * } catch (error) {
 *   console.error('Failed to get recipe:', error);
 * }
 */
async function getRecipeById(recipeId) {
    const conn = await db.getConnection();
    try {
        let recipeFound;
        const recipeExists = await checkRecipeExists(recipeId);

        if (!recipeExists.mixingExists || !recipeExists.weighingExists) {
            recipeFound = false;
            return {
                success: recipeFound,
                message: `Recipe with ID ${recipeId} does not exist.`,
                recipe_id: recipeId,
                recipeExists
            };
        }

        recipeFound = true;

        let [recipe_mixing] = await conn.query(
            `SELECT mix_seq_no, mix_condition, mix_time, mix_temp, mix_power, mix_energy, mix_action, mix_pressure, mix_speed 
            FROM recipe_mixing WHERE recipe_id = ?`,
            [recipeId]
        );

        let [recipe_weighing] = await conn.query(
            `SELECT * FROM recipe_weighing WHERE recipe_id = ?`,
            [recipeId]
        );
// convert timestamps to string to avoid issues in frontend

        let timestampFields = recipe_weighing[0]['ModifyTime'];
       
        if (timestampFields){
            console.log("inside timestamp conversion", timestampFields);
            recipe_weighing[0]['ModifyTime'] =  new Date(timestampFields).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        }

        if (recipe_weighing && 'Id' in recipe_weighing[0]) {
            delete recipe_weighing[0].Id;
        }

        let [recipe_weight_CB] = await conn.query(
            `SELECT CB_index, Act, CB_materialName, CB_materialCode, CB_set, CB_tol 
            FROM recipe_weight_cb WHERE recipe_id = ?`,
            [recipeId]
        );

        let [recipe_weight_poly] = await conn.query(
            `SELECT POLY_index, sheet_filter, POLY_materialName, POLY_materialCode, POLY_set, POLY_tol 
            FROM recipe_weight_poly WHERE recipe_id = ?`,
            [recipeId]
        );

        let [recipe_weight_oil_a] = await conn.query(
            `SELECT OIL_A_index, Act, OIL_A_materialName, OIL_A_materialCode, OIL_A_set, OIL_A_tol 
            FROM recipe_weight_oil_a WHERE recipe_id = ?`,
            [recipeId]
        );

        let [recipe_weight_oil_b] = await conn.query(
            `SELECT OIL_B_index, Act, OIL_B_materialName, OIL_B_materialCode, OIL_B_set, OIL_B_tol 
            FROM recipe_weight_oil_b WHERE recipe_id = ?`,
            [recipeId]
        );
        
        let [recipe_weight_PD] = await conn.query(
            `SELECT PD_index, Act, PD_materialName, PD_materialCode, PD_set, PD_tol 
            FROM recipe_weight_chemical_pd WHERE recipe_id = ?`,
            [recipeId]
        );



        let [recipe_weight_filler] = await conn.query(
            `SELECT FL_index, Act, FL_materialName, FL_materialCode, FL_set, FL_tol 
            FROM recipe_weight_filler WHERE recipe_id = ?`,
            [recipeId]
        );
        
        // const [recipe_weight_silica] = await conn.query(
            //     `SELECT SI_index, Act, SI_materialName, SI_materialCode, SI_set, SI_tol 
            //     FROM recipe_weight_silica WHERE recipe_id = ?`,
        //     [recipeId]
        // );

//check for empty arrays and set  defult values for display purpose

        if (!Array.isArray(recipe_weight_CB) || recipe_weight_CB.length === 0) {
            recipe_weight_CB = [{ 
        "CB_index": "1",
        "Act": "",
        "CB_materialName": "",
        "CB_materialCode": "",
        "CB_set": "",
        "CB_tol": "",}];
        }

        if (!Array.isArray(recipe_weight_PD) || recipe_weight_PD.length === 0) {
            recipe_weight_PD = [{ 
                "PD_index": "1",
                "Act": "",
                "PD_materialName": "",
                "PD_materialCode": "",
                "PD_set": "",
                "PD_tol": "",
                }];
        }

        if (!Array.isArray(recipe_weight_filler) || recipe_weight_filler.length === 0) {
            recipe_weight_filler = [{ 
                "FL_index": "1",
                "Act": "",
                "FL_materialName": "",
                "FL_materialCode": "",
                "FL_set": "",
                "FL_tol": "",
            }];
        }

        if (!Array.isArray(recipe_weight_poly) || recipe_weight_poly.length === 0) {
            recipe_weight_poly = [{ 
                "POLY_index": "1",
                "POLY_materialName": "",
                "POLY_materialCode": "",
                "POLY_set": "",
                "POLY_tol": "",
                "sheet_filter": ""
            }];
        }

        if (!Array.isArray(recipe_weight_oil_a) || recipe_weight_oil_a.length === 0) {
            recipe_weight_oil_a = [{ 
                "OIL_A_index": "1",
                "Act": "",
                "OIL_A_materialName": "",
                "OIL_A_materialCode": "",
                "OIL_A_set": "",
                "OIL_A_tol": "",
            }];
        }

        if (!Array.isArray(recipe_weight_oil_b) || recipe_weight_oil_b.length === 0) {
            recipe_weight_oil_b = [{ 
                "OIL_B_index": "1",
                "Act": "",
                "OIL_B_materialName": "",
                "OIL_B_materialCode": "",
                "OIL_B_set": "",
                "OIL_B_tol": "",
            }];
        }


        const returnObject = {
            success: recipeFound,
            recipe_id: recipeId,
            recipe_mixing,
            recipe_weighing,
            recipe_weight_CB,
            recipe_weight_PD,
            recipe_weight_filler,
            recipe_weight_poly,
            recipe_weight_oil_a,
            recipe_weight_oil_b
        }


        return returnObject;

        // return {
        //     success: recipeFound,
        //     recipe_id: recipeId,
        //     recipe_mixing,
        //     recipe_weighing,
        //     recipe_weight_CB,
        //     recipe_weight_PD,
        //     recipe_weight_filler,
        //     recipe_weight_poly,
        //     recipe_weight_oil_a,
        //     recipe_weight_oil_b
        //     // recipe_weight_silica,
        // };

    } catch (error) {
        console.error("Error fetching recipe:", error);
        return {
            success: false,
            message: "Database error occurred while fetching recipe",
            error: error.message,
            errLocation: "controller/recipe.controller.js - getRecipeById"
        };
    } finally {
        conn.release(); // Always release the connection
    }
}

/**
 * Deletes a recipe and all its related data from all tables
 * 
 * @async
 * @param {string|number} recipeId - The unique identifier of the recipe to delete
 * @returns {Promise<Object>} Result object containing:
 *   - success: Boolean indicating if deletion was successful
 *   - message: Description of the operation result
 *   - error?: Error message if operation failed
 * @throws {Error} Database transaction errors
 */
async function deleteRecipeByID(recipeId) {
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();
        const [results] = await conn.query(
            `
            DELETE FROM recipe_mixing WHERE recipe_id = ?;
            DELETE FROM recipe_weighing WHERE recipe_id = ?;
            DELETE FROM recipe_weight_cb WHERE recipe_id = ?;
            DELETE FROM recipe_weight_chemical_pd WHERE recipe_id = ?;
            DELETE FROM recipe_weight_filler WHERE recipe_id = ?;
            DELETE FROM recipe_weight_oil_a WHERE recipe_id = ?;
            DELETE FROM recipe_weight_oil_b WHERE recipe_id = ?;
            DELETE FROM recipe_weight_poly WHERE recipe_id = ?;
        `,
            [
                recipeId,
                recipeId,
                recipeId,
                recipeId,
                recipeId,
                recipeId,
                recipeId,
                recipeId,
            ]
        );

        let totalDeleted = 0;
        results.forEach((r) => {
            totalDeleted += r.affectedRows || 0;
        });

        await conn.commit(); // Move commit before return
        await recipeHistory(recipeId, 'DELETED', {});
        if (totalDeleted > 0) {
            return {
                success: true,
                message: `Deleted ${totalDeleted} rows for recipe_id=${recipeId}`,
            };
        } else {
            return {
                success: false,
                message: `No rows found for recipe_id=${recipeId}`,
            };
        }
    } catch (error) {
        await conn.rollback(); // ❌ error
        console.error("Error deleting recipe:", error);
        return {
            success: false,
            message: "Database error occurred while deleting recipe",
            error: error.message,
        };
    }
    finally {
        conn.release(); // ✅ always release
    }
}


/**
 * Inserts or updates a complete recipe with all its components into the database
 * Handles data validation, empty arrays, and database transactions
 * 
 * @async
 * @param {Object} recipe_json - Complete recipe data object
 * @param {Object} recipe_json.data - Recipe data container
 * @param {string|number} recipe_json.data.recipe_id - Unique recipe identifier
 * @param {Array} [recipe_json.data.recipe_mixing=[]] - Mixing steps and parameters
 * @param {Object} [recipe_json.data.recipe_weighing={}] - Weighing parameters
 * @param {Array} [recipe_json.data.recipe_weight_CB=[]] - Carbon black weights
 * @param {Array} [recipe_json.data.recipe_weight_PD=[]] - Chemical PD weights
 * @param {Array} [recipe_json.data.recipe_weight_poly=[]] - Polymer weights
 * @param {Array} [recipe_json.data.recipe_weight_oil_a=[]] - Oil A weights
 * @param {Array} [recipe_json.data.recipe_weight_filler=[]] - Filler weights
 * @param {boolean} [newInsert=false] - If true, performs new insert; if false, updates existing
 * 
 * @returns {Promise<Object>} Result object containing:
 *   - success {boolean} - True if operation successful
 *   - message {string} - Detailed summary of inserted rows
 *   - error? {string} - Error message if operation failed
 * 
 * @throws {Error} If database connection or transaction fails
 * 
 * @example
 * try {
 *   const recipe = {
 *     data: {
 *       recipe_id: "RECIPE001",
 *       recipe_mixing: [{mix_seq_no: 1, mix_condition: "Standard"}],
 *       recipe_weighing: {recipe_name: "Test Recipe"}
 *     }
 *   };
 *   const result = await insertRecipe(recipe, true);
 *   console.log(result.success, result.message);
 * } catch (error) {
 *   console.error('Failed to insert recipe:', error);
 * }
 */
async function insertRecipe(recipe_json, newInsert = false) {
    const recipe_id = recipe_json.recipe_weighing.recipe_id;

    // Array/Object initialization with null checks
    const recipeMixArray = Array.isArray(recipe_json.recipe_mixing) ? recipe_json.recipe_mixing : [];
    const recipeWeighing = recipe_json.recipe_weighing || {};
    const recipeWeightCB = Array.isArray(recipe_json.recipe_weight_CB) ? recipe_json.recipe_weight_CB : [];
    const recipeWeightPD = Array.isArray(recipe_json.recipe_weight_chemical_PD) ? recipe_json.recipe_weight_chemical_PD : [];
    const recipeWeightPoly = Array.isArray(recipe_json.recipe_weight_poly) ? recipe_json.recipe_weight_poly : [];
    const recipeWeightOilA = Array.isArray(recipe_json.recipe_weight_oil_a) ? recipe_json.recipe_weight_oil_a : [];
    const recipeWeightOilB = Array.isArray(recipe_json.recipe_weight_oil_b) ? recipe_json.recipe_weight_oil_b : [];
    // const recipeWeightSilica = Array.isArray(recipe_json.recipe_weight_silica) ? recipe_json.recipe_weight_silica : [];
    const recipeWeightFiller = Array.isArray(recipe_json.recipe_weight_filler) ? recipe_json.recipe_weight_filler : [];


    // console.log("inside inser recipe",recipeWeightCB );

    const conn = await db.getConnection();
    const results = {
        mixing: 0,
        weighing: 0,
        cb: 0,
        pd: 0,
        poly: 0,
        oilA: 0,
        oilB: 0,
        // silica: 0,
        filler: 0
    };

    // CB Query
    const CBQuery = `
    INSERT INTO recipe_weight_cb (
        CB_index, Act, recipe_id, 
        CB_materialName, CB_materialCode, 
        CB_set, CB_tol
    ) VALUES ?
`;

    // PD Query
    const PDQuery = `
    INSERT INTO recipe_weight_chemical_pd (
        PD_index, Act, recipe_id, 
        PD_materialName, PD_materialCode, 
        PD_set, PD_tol
    ) VALUES ?
`;

    // Poly Query
    const polyQuery = `
    INSERT INTO recipe_weight_poly (
        POLY_index,  recipe_id,
        POLY_materialName, POLY_materialCode,
        POLY_set, POLY_tol,sheet_filter
    ) VALUES ?
`;

    // Oil A Query
    const oilAQuery = `
    INSERT INTO recipe_weight_oil_a (
        OIL_A_index, Act, recipe_id,
        OIL_A_materialName, OIL_A_materialCode,
        OIL_A_set, OIL_A_tol
    ) VALUES ?
`;

    // Oil B Query
    const oilBQuery = `
    INSERT INTO recipe_weight_oil_b (
        OIL_B_index, Act, recipe_id,
        OIL_B_materialName, OIL_B_materialCode,
        OIL_B_set, OIL_B_tol
    ) VALUES ?
`;

    // Silica Query
    // const silicaQuery = `
    //     INSERT INTO recipe_weight_silica (
    //         SI_index, Act, recipe_id,
    //         SI_materialName, SI_materialCode,
    //         SI_set, SI_tol
    //     ) VALUES ?
    // `;

    // Filler Query
    const fillerQuery = `
    INSERT INTO recipe_weight_filler (
        FL_index, Act, recipe_id,
        FL_materialName, FL_materialCode,
        FL_set, FL_tol
    ) VALUES ?
`;

    try {
        await conn.beginTransaction();

        // Delete existing recipe if not new insert
        if (!newInsert) {
            await conn.query("DELETE FROM recipe_mixing WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weighing WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_cb WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_chemical_pd WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_poly WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_oil_a WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_oil_b WHERE recipe_id = ?", [recipe_id]);
            // await conn.query("DELETE FROM recipe_weight_silica WHERE recipe_id = ?", [recipe_id]);
            await conn.query("DELETE FROM recipe_weight_filler WHERE recipe_id = ?", [recipe_id]);
            console.log(`Existing recipe with ID ${recipe_id} deleted for update.`);
        }

        // Recipe Mixing Insert
        if (recipeMixArray.length > 0) {
            const recipe_mixing_values = recipeMixArray.map(step => [
                recipe_id,
                step.mix_seq_no,
                step.mix_condition,
                step.mix_time,
                step.mix_temp,
                step.mix_power,
                step.mix_energy,
                step.mix_action,
                step.mix_pressure,
                step.mix_speed
            ]);

            const mixQuery = `
                INSERT INTO recipe_mixing (
                    recipe_id,
                    mix_seq_no,
                    mix_condition,
                    mix_time, 
                    mix_temp,
                    mix_power,
                    mix_energy,
                    mix_action,
                    mix_pressure,
                    mix_speed
                ) VALUES ?
            `;

            const [mixingResult] = await conn.query(mixQuery, [recipe_mixing_values]);
            results.mixing = mixingResult.affectedRows;
        }
        let ModifyTime = getMySQLTimestamp();
        // Recipe Weighing Insert (Always required)
        if (Object.keys(recipeWeighing).length > 0) {
            const weighValues = [
                recipeWeighing.recipe_id,                         // 1
                recipeWeighing.recipe_name,        // 2
                recipeWeighing.MaxTempOfFeed,      // 3
                recipeWeighing.MaxTimeOvertempDischarge,  // 4
                recipeWeighing.MinTimeOvertempDischarge,  // 5
                recipeWeighing.TempOvertempDischarg,      // 6
                recipeWeighing.CBReclaim,          // 7
                recipeWeighing.TimeOfCBReclaim,    // 8
                ModifyTime,         // 9
                recipeWeighing.UsingStatus,        // 10
                recipeWeighing.Remark,             // 11
                recipeWeighing.UseThreeTMP,        // 12
                recipeWeighing.DischargeTEMP_Max,    // 13
                recipeWeighing.DischargeTEMP_Min,    // 14
                recipeWeighing.DischargeTIME_Max,   // 15
                recipeWeighing.DischargeTIME_Min,   // 16
                recipeWeighing.OverEnergy,         // 17
                recipeWeighing.TotalRubTolerance,  // 18
                recipeWeighing.RotorTMP,           // 19
                recipeWeighing.DischargeDoorTMP,   // 20
                recipeWeighing.MixRoomTMP,         // 21
                recipeWeighing.RotorTMPMinTol,     // 22
                recipeWeighing.RotorTMPMaxTol,     // 23
                recipeWeighing.DischargeDoorTMPMinTol,  // 24
                recipeWeighing.DischargeDoorTMPMaxTol,  // 25
                recipeWeighing.MixRoomTMPMinTol,   // 26
                recipeWeighing.MixRoomTMPMaxTol,   // 27
                recipeWeighing.IsActivate          // 28
            ];

            const weighQuery = `
                INSERT INTO recipe_weighing (
                    recipe_id,                  -- 1
                    recipe_name,                -- 2
                    MaxTempOfFeed,             -- 3
                    MaxTimeOvertempDischarge,   -- 4
                    MinTimeOvertempDischarge,   -- 5
                    TempOvertempDischarg,      -- 6
                    CBReclaim,                 -- 7
                    TimeOfCBReclaim,           -- 8
                    ModifyTime,                -- 9
                    UsingStatus,               -- 10
                    Remark,                    -- 11
                    UseThreeTMP,               -- 12
                    DischargeTEMP_Max,           -- 13
                    DischargeTEMP_Min,           -- 14
                    DischargeTIME_Max,          -- 15
                    DischargeTIME_Min,          -- 16
                    OverEnergy,                -- 17
                    TotalRubTolerance,         -- 18
                    RotorTMP,                  -- 19
                    DischargeDoorTMP,          -- 20
                    MixRoomTMP,                -- 21
                    RotorTMPMinTol,            -- 22
                    RotorTMPMaxTol,            -- 23
                    DischargeDoorTMPMinTol,    -- 24
                    DischargeDoorTMPMaxTol,    -- 25
                    MixRoomTMPMinTol,          -- 26
                    MixRoomTMPMaxTol,          -- 27
                    IsActivate                 -- 28
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [weighResult] = await conn.query(weighQuery, weighValues);
            results.weighing = weighResult.affectedRows;
        } else {
            throw new Error("Recipe weighing data is required");
        }



        // CB Values Insert
        if (recipeWeightCB.length > 0) {
            const CBvalues = recipeWeightCB.map(item => [
                item.CB_index, item.Act, recipe_id,
                item.CB_materialName, item.CB_materialCode,
                item.CB_set, item.CB_tol
            ]);
            const [cbResult] = await conn.query(CBQuery, [CBvalues]);
            results.cb = cbResult.affectedRows;
        }

        // PD Values Insert
        if (recipeWeightPD.length > 0) {
            const PDValues = recipeWeightPD.map(item => [
                item.PD_index, item.Act, recipe_id,
                item.PD_materialName, item.PD_materialCode,
                item.PD_set, item.PD_tol
            ]);
            const [pdResult] = await conn.query(PDQuery, [PDValues]);
            results.pd = pdResult.affectedRows;
        }

        // Poly Values Insert
        if (recipeWeightPoly.length > 0) {
            const polyValues = recipeWeightPoly.map(item => [
                item.POLY_index, recipe_id,
                item.POLY_materialName, item.POLY_materialCode,
                item.POLY_set, item.POLY_tol, item.sheet_filter
            ]);
            const [polyResult] = await conn.query(polyQuery, [polyValues]);
            results.poly = polyResult.affectedRows;
        }

        // Oil A Values Insert
        if (recipeWeightOilA.length > 0) {
            const oilAValues = recipeWeightOilA.map(item => [
                item.OIL_A_index, item.Act, recipe_id,
                item.OIL_A_materialName, item.OIL_A_materialCode,
                item.OIL_A_set, item.OIL_A_tol
            ]);
            const [oilAResult] = await conn.query(oilAQuery, [oilAValues]);
            results.oilA = oilAResult.affectedRows;
        }

        // Oil B Values Insert
        if (recipeWeightOilB.length > 0) {
            const oilBValues = recipeWeightOilB.map(item => [
                item.OIL_B_index, item.Act, recipe_id,
                item.OIL_B_materialName, item.OIL_B_materialCode,
                item.OIL_B_set, item.OIL_B_tol
            ]);
            const [oilBResult] = await conn.query(oilBQuery, [oilBValues]);
            results.oilB = oilBResult.affectedRows;
        }

        // Silica Values Insert
        // if (recipeWeightSilica.length > 0) {
        //     const silicaValues = recipeWeightSilica.map(item => [
        //         item.SI_index, item.Act, recipe_id,
        //         item.SI_materialName, item.SI_materialCode,
        //         item.SI_set, item.SI_tol
        //     ]);
        //     const [silicaResult] = await conn.query(silicaQuery, [silicaValues]);
        //     results.silica = silicaResult.affectedRows;
        // }

        // Filler Values Insert
        if (recipeWeightFiller.length > 0) {
            const fillerValues = recipeWeightFiller.map(item => [
                item.FL_index, item.Act, recipe_id,
                item.FL_materialName, item.FL_materialCode,
                item.FL_set, item.FL_tol
            ]);
            const [fillerResult] = await conn.query(fillerQuery, [fillerValues]);
            results.filler = fillerResult.affectedRows;
        }

        await conn.commit();
        await recipeHistory(recipe_id, 'insert', recipe_json);
        return {
            success: true,
            affectedRows: results,
            recipe_id: recipe_id
        };

    } catch (error) {
        await conn.rollback();
        console.error("Error updating recipe:", error);
        return {
            success: false,
            message: "Database error occurred while updating recipe",
            errLocation: "controller/recipe.controller.js - insertRecipe try/catch block",
            error: error.message
        };
    } finally {
        conn.release();
    }

}



/**
 * Retrieves all unique recipe IDs from the recipe_weighing table in the database
 * 
 * @async
 * @returns {Promise<Object>} Result object containing:
 *   - success {boolean} - True if operation successful
 *   - data {Array<string|number>} - Array of recipe IDs if successful
 *   - message {string} - Error message if unsuccessful
 *   - error {string} - Detailed error information if unsuccessful
 * @throws {Error} If database connection fails
 * 
 * @description
 * This function:
 * 1. Establishes a database connection
 * 2. Queries the recipe_weighing table for all recipe IDs
 * 3. Maps the result to an array of IDs
 * 4. Handles errors and connection cleanup
 * 
 * @example
 * try {
 *   const result = await getAllRecipeIDs();
 *   if (result.success) {
 *     console.log('Recipe IDs:', result.data); // ['RECIPE001', 'RECIPE002', ...]
 *   } else {
 *     console.error(result.message);
 *   }
 * } catch (error) {
 *   console.error('Failed to get recipe IDs:', error);
 * }
 */

async function getAllRecipeIDs() {
    const conn = await db.getConnection();
    try {
        const query = `SELECT recipe_id FROM recipe_weighing`;
        const [rows] = await conn.query(query);
        const recipeIDs = rows.map(row => row.recipe_id);
        return {
            success: true,
            recipe_ids: recipeIDs
        };
    } catch (error) {
        console.error("Error fetching recipe IDs:", error);
        return {
            success: false,
            message: "Database error occurred while fetching recipe IDs",
            error: error.message,
            recipe_ids: []  
        };
    } finally {
        conn.release(); // ✅ always release        
    }
}


async function recipeHistory(recipe_id, action, data) {
    const conn = await db.getConnection();
    const jsonData = JSON.stringify(data);
    try {
        const historyQuery = `INSERT INTO recipe_history (recipe_id, action, data) VALUES (?, ?, ?)`;
        const [result] = await conn.query(historyQuery, [recipe_id, action, jsonData]);
        return result;
    } catch (error) {
        console.error("Error inserting recipe history:", error);
        throw error;
    } finally {
        conn.release();
    }
}

module.exports = {
    insertRecipe,
    deleteRecipeByID,
    getRecipeById,
    getAllRecipeIDs,
    checkRecipeExists
};//