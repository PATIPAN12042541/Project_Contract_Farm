import Users from "../models/GroupUsersView.js"

export const getViewUsersByDev = async(req, res) => {
    try {
        const GroupUsersView = await GroupUsersView.findAll({
            where:{
                role_id : 3,
            },
            attributes:['ID','NAME','LAST_NAME','GROUP_ID','GROUP_NAME']
        });
        res.json(GroupUsersView);
    } catch (error) {
        console.log(error);
    }
}