
async function getRecipeStatus(db) {
    try {
        const [rows] = await db.query(/*sql*/ `SELECT
            recipe_id, recipe_name, IsActivate, ModifyTime
            FROM recipe_weighing WHERE 1;`);
        const [totalRecipes] = await db.query(/*sql*/ `SELECT COUNT(*) AS total FROM recipe_weighing;`);

        const total = totalRecipes[0].total;
        const [activeRecipes] = await db.query(/*sql*/ `SELECT COUNT(*) AS active FROM recipe_weighing WHERE IsActivate = 1;`);
        const active = activeRecipes[0].active;
        const inactive = total - active;

        if (rows.length > 0) {
            return {
                success: true,
                data: rows,
                total_recipes: total,
                active_recipes: active,
                inactive_recipes: inactive,
                message: `Recipe status for ${rows.length} recipes retrieved successfully`
            }
        }
        else {
            return {
                success: true,
                message: "No recipe found in the database."
            }
        }


    }
    catch (error) {
        return {
            success: false,
            errLocation: "getRecipeStatus() func call at try-catch block.",
            error: error
        }
    }
}

async function updateRecipeStatus(recipeId, isActive, db) {
    try {
        const [result] = await db.query(/*sql*/ `UPDATE recipe_weighing SET IsActivate = ?, ModifyTime = NOW() WHERE recipe_id = ?`, [isActive, recipeId]);
        return {
            success: true,
            message: `Recipe: ${recipeId} , status: ${isActive} updated successfully`
        };
    } catch (error) {
        console.error(`Error updating recipe status for recipe_id: ${recipeId}`, error);
        return {
            success: false,
            errLocation: "updateRecipeStatus() func call at try-catch block.",
            error: error
        };
    }
}

module.exports = {
    getRecipeStatus,
    updateRecipeStatus
}       
