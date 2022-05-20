import RoleGroup from "../models/RoleGroup.js"
export const getRole = async (req, res) => {
    try {
        const rolegroups = await RoleGroup.findAll();
        res.json(rolegroups);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getRoleRegister = async (req, res) => {
    try {
        const rolegroups = await RoleGroup.sequelize.query('SELECT id,'+ 
                                                           'role_group_name,'+ 
                                                           'status '+
                                                           'FROM role_group '+
                                                           'WHERE status = 1 '+
                                                           'and id != 1');
        res.json(rolegroups);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

