const db = require("../mysql.conn.js");

async function getAllMaterials(){

    try{
        const [result] = await db.query("SELECT * FROM materials");
        return {
            success: true,
                    data: result
        }

    }catch(error){
        return {
            success: false,
            errLocation: "getAllMaterials() func call at try-catch block.",
            error: error.message
        }
    }finally{
    }
}

async function getMaterialNamesBycategory(category){

    try{
        const [result] = await db.query("SELECT MaterialName FROM materials WHERE category = ?", [category]);
        return {
            success: true,
            data: result
        }
    }catch(error){
        return {
            success: false,
            errLocation: "getMaterialBycategory() func call at try-catch block.",
            error: error.message
        }   
    }
}

async function getMaterialcodeBycategory(category){

    try{
        const [result] = await db.query("SELECT MaterialCode FROM materials WHERE category = ?", [category]);
        return {
            success: true,
            data: result
        }
    }catch(error){
        return {
            success: false,
            errLocation: "getMaterialBycategory() func call at try-catch block.",
            error: error.message
        }   
    }
}
//TODO: Implement add, delete and update functions for materials