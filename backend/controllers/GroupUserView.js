import GroupUser from "../models/GroupUserViewModel";

export const getUsersByDev = async(req, res) => {
    try {
        const groupUser = await GroupUser.findAll({
            attributes:[`id`, `name`, `last_name`, `group_id`, `group_name`],
            order:[`id`,'asc']
        });
        res.json(groupUser);
    } catch (error) {
        console.log(error);
    }
}