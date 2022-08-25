import GroupUsersView from "../models/GroupUsersView.js"

export const getViewUsersByDev = async(req, res) => {
    try {
        const GroupUsers = await GroupUsersView.findAll({
            where:{
                role_id : 3,
            },
            attributes:['ID','NAME','LAST_NAME','GROUP_ID','GROUP_NAME']
        });
        res.json(GroupUsers);
    } catch (error) {
        console.log(error);
    }
}