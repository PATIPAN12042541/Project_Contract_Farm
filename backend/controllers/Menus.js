import Menus from "../models/RoleMenu.js";
import db from "../config/Database.js";

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

export const getMenusRoleMainAll = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
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
        // const menus = await Menus.findAll({
        //     where:{
        //         role_id:req.params.role_id,
        //         //parent_id:1,
        //         parent_id :{
        //             [db.gt]: 0
        //         },
        //         status:1
        //     },
        //     order: [
        //         ['index_menu','asc'],
        //     ]
        // })

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