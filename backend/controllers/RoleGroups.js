import RoleGroups from "../models/RoleGroup";
export const getRole = async(req, res) => {
    try {
        const users = await RoleGroups.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
