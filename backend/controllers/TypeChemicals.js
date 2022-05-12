import TypeChemical from "../models/TypeChemicalModel.js";

export const createTypeChemical = async(req, res) => {
    const { type_chemical } = req.body;
    try {
        await TypeChemical.create({
            type_chemical: type_chemical,
        });
        res.json({msg: "Create Successful"});
    } catch (error) {
        //console.log(error);
        res.json(error)
    }
}

export const getAllTypeChemical = async (req, res) => {
    try {
        const typeChemicals = await TypeChemical.findAll();
        res.json(typeChemicals);
    } catch (error) {
        res.json(error);
    }  
}

export const getTypeChemicalByID = async (req, res) => {
    try {
        const typeChemicals = await TypeChemical.findAll({
            where:{
                id : req.params.id
            }
        });
        res.json(typeChemicals[0]);
    } catch (error) {
        res.json(error);
    }  
}