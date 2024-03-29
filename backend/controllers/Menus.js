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

export const getShowMenusRoleMain = async (req, res) => {
    try {
        const menus = await Menus.findAll({
            where:{
                role_id:req.params.role_id,
                parent_id:0,
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
        const menus = await Menus.sequelize.query('select id,menu_name,index_menu,parent_id,link,status,role_id '+
                                                  'from role_menu '+
                                                  'where role_id = :role_id '+
                                                  'and parent_id = :main_menu_id ' +
                                                  'order by index_menu asc',
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

export const createMainMenu = async(req, res) => {
    const { menu_name,
            index_menu,
            parent_id,
            link,
            status,
            role_id } = req.body;
    try {
        await Menus.create({

            menu_name : menu_name,
            index_menu : index_menu,
            parent_id : parent_id,
            link : link,
            status : status,
            role_id : role_id
        });
        res.json({msg: "Create Successful"});
    } catch (error) {
        res.json(error)
    }
}

export const updateMainMenu = async (req, res) => {
    try {
        await Menus.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Main Menu Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createSubMenu = async(req, res) => {
    const { menu_name,
            index_menu,
            parent_id,
            link,
            status,
            role_id } = req.body;
    try {
        await Menus.create({

            menu_name : menu_name,
            index_menu : index_menu,
            parent_id : parent_id,
            link : link,
            status : status,
            role_id : role_id
        });
        res.json({msg: "Create Successful"});
    } catch (error) {
        res.json(error)
    }
}

export const updateSubMenu = async (req, res) => {
    try {
        await Menus.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Sub Menu Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}