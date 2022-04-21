import RoleGroup from "../models/RoleGroup.js"
export const getRole = async(req, res) => {
    try {
        const rolegroups = await RoleGroup.findAll();
        res.json(rolegroups);
    } catch (error) {
        console.log(error);
    }
}
