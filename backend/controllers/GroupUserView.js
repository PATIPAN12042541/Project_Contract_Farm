import db from "../config/Database.js";

export const getUsersByDev = async(req, res) => {
    try {
        const GroupUser = await db.query(
            "SELECT user.id,"+
	        "user.name,"+
            "user.last_name,"+
            "role_group.id as group_id,"+
            "role_group.role_group_name as group_name "+
            "FROM user "+
            "LEFT JOIN role_group "+
            "on user.role_id = role_group.id",
            {
                type: db.QueryTypes.SELECT,
            }
        );
        res.json(GroupUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}