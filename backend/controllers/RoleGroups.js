import RoleGroup from "../models/RoleGroup.js"
export const getRole = async (req, res) => {
    try {
        //const rolegroups = await RoleGroup.findAll();


        const rolegroups = await RoleGroup.sequelize.query('select * from role_group');

        res.json(rolegroups);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

