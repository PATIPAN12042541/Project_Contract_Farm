import Type_Chemical from "../models/TypeChemicalModel";

export const createTypeChemical = async(req, res) => {
    const { type_chemical } = req.body;
    try {
        await Type_Chemical.create({
            type_chemical: type_chemical,
        });
        res.json({msg: "Create Successful"});
    } catch (error) {
        console.log(error);
    }
}