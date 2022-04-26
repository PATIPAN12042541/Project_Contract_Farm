import RoleGroup from "../models/RoleGroup.js"
import Users from "../models/UserModel.js";
export const getRole = async (req, res) => {
    try {
        const rolegroups = await RoleGroup.findAll();
        res.json(JSON.stringify(rolegroups));
    } catch (error) {
        res.json({ message: error.message });
    }  
}

