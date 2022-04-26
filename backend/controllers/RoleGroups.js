import RoleGroup from "../models/RoleGroup.js"
import Users from "../models/UserModel.js";
export const getRole = async (req, res) => {
    try {
        //const rolegroups = await RoleGroup.findAll();


        const rolegroups = await RoleGroup.sequelize.query('select * from role_group');

        /*const rolegroups = await RoleGroup.findAll({
            include: [Users]
          });*/

        res.json(JSON.stringify(rolegroups));
    } catch (error) {
        res.json({ message: error.message });
    }  
}

