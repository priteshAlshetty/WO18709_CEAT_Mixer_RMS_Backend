const db = require("../mysql.conn.js");

async function getAllMaterials(){

    try{
        const [result] = await db.query("SELECT `material_code`, `material_name`, `material_category`,  FROM `material_manager` WHERE 1");
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
async function addMaterial(materialData){

    try{
        const [result] = await db.query("INSERT INTO `material_manager` (`material_code`, `material_name`, `material_category`) VALUES (?, ?, ?)", [materialData.material_code, materialData.material_name, materialData.material_category]);
        return {
                    success: true,
                    data: result
        }

    }catch(error){
        return {
            success: false,
            errLocation: "addMaterial() func call at try-catch block.",
            error: error.message
        }
    }finally{
    }
}

module.exports = {
    getAllMaterials,
    addMaterial         
}
//TODO: Implement add, delete and update functions for materials