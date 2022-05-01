import Menus from "../models/RoleMenu.js";
export const getMenusRoleMain = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
                role_id : req.params.role_id,
                parent_id : "0"
            }
        });
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
