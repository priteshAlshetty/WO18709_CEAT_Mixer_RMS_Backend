const express = require('express');
const router = express.Router();
const recipetest = require('../recipe_response.json')


const { insertRecipe,
    deleteRecipeByID,
    getRecipeById,
    getAllRecipeIDs,
    checkRecipeExists} = require('../controllers/recipe.controller.js'); 
const { error } = require('winston');



router.get('/allRecipeIds', async (req,res) => {
    try{
        const allRecipeIds = await getAllRecipeIDs();
        if(allRecipeIds && allRecipeIds.success){
            res.status(200).json({data:allRecipeIds});
        } else if(allRecipeIds && !allRecipeIds.success){
            res.status(404).json({ 
                message: 'No Recipe IDs found' , 
                data : allRecipeIds });
        }
    }catch(error){
        res.status(500).json({ 
            message: 'Error fetching recipe IDs', 
            error: error.message, 
            errLocation :"try catch block of endpoint allRecipeIds " });
    }
});

router.post('/checkRecipeExists/byId', async (req,res)=>{

        if (!req.body) {
        return res.status(400).json({ 
            error: "missing request body", 
            errLocation: "checkRecipeExists/byId request body check",
            message: "Request body is required" 
        });
    }
    const recipeId = req.body.recipe_id;

    try{
        if(recipeId) {
            const recipe = await checkRecipeExists(recipeId);
            if(recipe && recipe.mixingExists && recipe.weighingExists) {
                res.status(200).json({message: 'Recipe exists', data:recipe});    
            } else if(recipe && (!recipe.mixingExists || !recipe.weighingExists)){
                res.status(404).json({ 
                    message: 'Recipe not found' , 
                    data : recipe });
            }
        } else {
            res.status(400).json({ message: 'Invalid recipe ID' });
        }
    }catch(error){
        res.status(500).json({ 
            message: 'Error fetching recipe data', 
            error: error.message, 
            errLocation :"try catch block of endpoint checkRecipeExists/byId " });
    }

});

router.post('/viewRecipe/byId', async (req,res)=>{
    const recipeId = req.body.recipe_id;
    
    
    // console.log("recipeId received at backend viewRecipe/byId endpoint", recipeId);
    try{
        if(recipeId) {
            const recipe = await getRecipeById(recipeId);
            if(recipe && recipe.success) {
                // console.log("JSON : ",recipe);
                res.status(200).json({data:recipe});
            } else if(recipe && !recipe.success){
                res.status(404).json({ message: 'Recipe not found' , data : recipe });
            }
        } else {
            res.status(400).json({ message: 'Invalid recipe ID' });
        }
    }catch(error){
        res.status(500).json({ message: 'Error fetching recipe data', error: error.message, errLocation :"try catch block of endpoint viewRecipe/byId " });
    }

});

router.post('/editRecipe/byId', async (req,res)=>{
    // console.log("editRecipe/byId endpoint hit");
    // console.log("req.body", req.body);
        if (!req.body) {
        return res.status(400).json({ 
            error: "missing request body", 
            errLocation: "editRecipe/byId request body check",
            message: "Request body is required" 
        });
    }
    // Use nullish coalescing to assign null if req.body.recipe doesn't exist
    const recipe = req.body?.recipe ?? null;


    // console.log("recipe received at backend editRecipe/byId endpoint", recipe);

    try{
        if(recipe){
            const result = await insertRecipe(recipe);
            res.status(200).json({ 
                message: 'Recipe updated successfully', data: result });
        }else{
            res.status(400).json({ 
                error: "missing required parameter", 
                errLocation :"if(!recipe) else block of endpoint editRecipe/byId ", 
                message: 'Required parameter "recipe" missing' });
        }

    }catch(error){
        res.status(500).json({ 
            message: 'Error fetching recipe data', 
            error: error.message, 
            errLocation :"try catch block of endpoint editRecipe/byId " });
    }

});

router.post('/addNewRecipe', async(req,res) => {

        if (!req.body) {
        return res.status(400).json({ 
            error: "missing request body", 
            errLocation: "addNewRecipe request body check",
            message: "Request body is required" 
        });
    }
const recipe = req.body.recipe; 
console.log("recipe recieved", recipe)
const recipeId = req.body.recipe.recipe_id;
//console.log("recipe received at backend addNewRecipe/byId endpoint", recipe);
    try{
        if(recipe && recipeId){
            const existingRecipe = await checkRecipeExists(recipeId);
            console.log("existingRecipe", existingRecipe);
            if(existingRecipe.mixingExists || existingRecipe.weighingExists){
                return res.status(400).json({ 
                    error : "Recipe ID already exists", 
                    errLocation :"if(existingRecipe.mixingExists || existingRecipe.weighingExists) block of endpoint addNewRecipe/byId ",
                    message: `Recipe with ID ${recipeId} already exists, either go to edit recipe or delete it!!` });
            }
            const result = await insertRecipe(recipe,true);
            res.status(200).json({ message: 'Recipe  Added successfully', data: result });
        }else{
            res.status(400).json({ message: 'recipe missing' });
        }

    }catch(error){
        res.status(500).json({ 
            message: 'Error fetching recipe data', 
            error: error.message, 
            errLocation :"try catch block of endpoint addNewRecipe/byId " });
    }

})

router.delete('/deleteRecipe/byId', async(req,res) =>{
    const recipeId = req.body.recipe_id;

    try{
        if(recipeId){
            const result = await deleteRecipeByID(recipeId);
            res.status(200).json({ message: 'Recipe deleted successfully', data: result });
        }else{
            res.status(400).json({ message: 'recipe_id missing' });
        }

    }catch(error){
        res.status(500).json({ 
            message: 'Error deleting recipe', 
            error: error.message, 
            errLocation :"try catch block of endpoint deleteRecipe/byId " });
    }   
    
})

module.exports = router;