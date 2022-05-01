import Menus from "../models/RoleMenu.js";
export const getMenusRoleMain = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
                role_id:req.params.id,
                parent_id:0,
                status:1,
            },
            order: [
                ['parent_id','asc'],
                ['index_menu','asc'],
            ]
        })
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    } 
}

export const getMenusRoleSubLV1 = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
                role_id:req.params.id,
                parent_id:req.params.id,
                status:1,
            },
            order: [
                ['index_menu','asc'],
            ]
        })
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    } 
}