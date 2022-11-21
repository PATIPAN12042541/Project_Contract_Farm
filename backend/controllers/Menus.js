import Menus from "../models/RoleMenu.js";
import db from "../config/Database.js";

export const getMenusRoleMain = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
                role_id:req.params.role_id,
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
        const menus = await Menus.sequelize.query('select id,menu_name,index_menu,parent_id,link,status,role_id '+
                                                  'from role_menu '+
                                                  'where role_id = :role_id '+
                                                  'and parent_id > 0 ' +
                                                  'and status = 1 ' +
                                                  'order by index_menu asc',
                                                  {
                                                    replacements : {role_id : req.params.role_id},
                                                    type: db.QueryTypes.SELECT
                                                  })
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    } 
}

export const getMenusRoleSubLV1_2 = async (req, res) => {
    try {
        const menus = await Menus.sequelize.query('select role_menu.id,role_menu.menu_name,role_menu.index_menu,role_menu.parent_id,role_group.role_group_name,role_menu.link,role_menu.status,role_menu.role_id '+
                                                  'from role_menu '+
                                                  'left join role_group '+
                                                  'on role_menu.parent_id = role_group.id '+
                                                  'where role_menu.role_id = :role_id '+
                                                  'and role_menu.parent_id = :main_menu_id ' +
                                                  'and role_menu.status = 1 ' +
                                                  'order by role_menu.index_menu asc',
                                                  {
                                                    replacements : {role_id : req.params.role_id,
                                                                    main_menu_id : req.params.main_menu_id},
                                                    type: db.QueryTypes.SELECT
                                                  })
        res.json(menus);
    } catch (error) {
        res.json({ message: error.message });
    } 
}