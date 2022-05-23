import RoleGroup from "../models/RoleGroup.js"
import db from "../config/Database.js"

export const createTypeRole = async(req, res) => {
    const { role_group_name,status } = req.body;
    try {
        await RoleGroup.create({

            role_group_name: role_group_name,
            status: status,
        });
        res.json({msg: "Create Successful"});
    } catch (error) {
        //console.log(error);
        res.json(error)
    }
}

export const getRole = async (req, res) => {
    try {
        const rolegroups = await RoleGroup.findAll();
        res.json(rolegroups);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getTypeUserByID = async (req, res) => {
    try {
        const rolegroups = await RoleGroup.findAll({
            where:{
                id : req.params.id
            }
        });
        res.json(rolegroups[0]);
    } catch (error) {
        res.json(error);
    }  
}


export const getRoleRegister = async (req, res) => {
    try {
        const rolegroups = await db.query('SELECT id,'+ 
                                          'role_group_name,'+ 
                                          'status '+
                                          'FROM role_group '+
                                          'WHERE status = 1 '+
                                          'and id = 3',
                                          {
                                            type: db.QueryTypes.SELECT
                                          });
        res.json(rolegroups);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateTypeUser = async (req, res) => {
    try {
        await RoleGroup.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Type User Updated"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteTypeUser = async (req, res) => {
    try {
        await RoleGroup.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Type User Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
