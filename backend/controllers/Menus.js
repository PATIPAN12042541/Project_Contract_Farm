import Menus from "../models/RoleMenu.js";
import db from "../config/Database.js";
export const getMenusRoleMain = async (req, res) => {
    try {
        const menus = await Menus.query(
            "SELECT id,"+
            "       menu_name,"+
            "       index_menu,"+
            "       parent_id,"+
            "       link,"+
            "       role_id "+
            "FROM role_menu "+
            "where role_id = :role_id "+
            "order by index_menu asc",
            {
                replacements: { role_id: req.params.role_id },
                type: Menus.QueryTypes.SELECT
            }
        );
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
