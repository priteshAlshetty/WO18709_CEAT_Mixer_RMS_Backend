const db = require("../mysql.conn.js");

async function getAllMaterials() {

    try {
        const [cb] = await db.query("SELECT `material_code`, `material_name`  ,`BinID` FROM `material_manager` WHERE `material_type`='CB'   ORDER BY `material_name` ASC");

        const [pd] = await db.query("SELECT `material_code`, `material_name`  ,`BinID` FROM `material_manager` WHERE `material_type`='PD'   ORDER BY `material_name` ASC");

        const [Poly] = await db.query("SELECT `material_code`, `material_name`  FROM `material_manager` WHERE `material_type`='Poly'   ORDER BY `material_name` ASC");

        const [fl] = await db.query("SELECT `material_code`, `material_name` ,`BinID` FROM `material_manager` WHERE `material_type`='FL'   ORDER BY `material_name` ASC");

        const [Oil1] = await db.query("SELECT `material_code`, `material_name` ,`BinID` FROM `material_manager` WHERE `material_type`='Oil1'   ORDER BY `material_name` ASC");

        const [Oil2] = await db.query("SELECT `material_code`, `material_name` ,`BinID` FROM `material_manager` WHERE `material_type`='Oil2'   ORDER BY `material_name` ASC");

        const result = {
            CB: {
                "count": cb.length,
                "data": cb
            },


            PD: {
                "count": pd.length,
                "data": pd
            },
            Poly: {
                "count": Poly.length,
                "data": Poly
            },
            FL: {
                "count": fl.length,
                "data": fl
            },
            Oil1: {
                "count": Oil1.length,
                "data": Oil1
            },
            Oil2: {
                "count": Oil2.length,
                "data": Oil2
            }
        }
        return {
            success: true,
            data: result
        }

    } catch (error) {
        return {
            success: false,
            errLocation: "getAllMaterials() func call at try-catch block.",
            error: error.message
        }
    } finally {
    }
}
async function addMaterial(materialData) {

    try {
        const [result] = await db.query("INSERT INTO `material_manager` (`material_code`, `material_name`, `material_type`) VALUES (?, ?, ?)", [materialData.material_code, materialData.material_name, materialData.material_type]);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Insert successful for : " + materialData.material_code,

                data: result
            };
        } else {
            return {
                success: false,
                message: "No rows inserted",
                data: result
            };
        }

    } catch (error) {
        return {
            success: false,
            errLocation: "addMaterial() func call at try-catch block.",
            error: error.message
        }
    } finally {
    }
}

async function deleteMaterial(materialData) {
    try {
        const [result] = await db.query("DELETE FROM `material_manager` WHERE `material_code` = ?", [materialData.material_code]);

        if (result.affectedRows > 0) {
            return {
                success: true,
                message: "Delete successful for : " + materialData.material_code,
                data: result
            };
        } else {
            return {
                success: false,
                message: "No rows deleted",
                data: result
            };
        }

    } catch (error) {
        return {
            success: false,
            errLocation: "deleteMaterial() func call at try-catch block.",
            error: error.message
        }
    } finally {
        console.log("deleteMaterial() executed for:", materialData.material_code);
    }
}

async function getDropdownMaterials() {

    try {
        const [CB] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='CB'  ORDER BY `material_name` ASC");

        const [PD] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='PD'  ORDER BY `material_name` ASC");
        const [Poly] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='Poly'  ORDER BY `material_name` ASC");
        const [FL] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='FL'  ORDER BY `material_name` ASC");
        const [Oil1] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='Oil1'  ORDER BY `material_name` ASC");
        const [Oil2] = await db.query("SELECT  `material_name` AS name, `material_code` AS code FROM `material_manager` WHERE `material_type` ='Oil2'  ORDER BY `material_name` ASC");
        return {
            success: true,
            data: {
                CB: CB,
                PD: PD,
                Poly: Poly,
                FL: FL,
                Oil1: Oil1,
                Oil2: Oil2
            }
        }

    } catch (error) {
        return {
            success: false,
            errLocation: "getDropdownMaterials() func call at try-catch block.",
            error: error.message
        }
    }
}





module.exports = {
    getAllMaterials,
    addMaterial,
    deleteMaterial,
    getDropdownMaterials
}
//TODO: Implement add, delete and update functions for materials