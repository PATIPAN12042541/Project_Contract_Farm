import db from "../config/Database.js";
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username','name','last_name']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUsersByRole = async(req, res) => {
    try {
        const users = await Users.findAll({
            where:{
                role_id : 3,
            },
            attributes:['id','username','name','last_name','role_id']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const getUsersByDev = async(req, res) => {
    try {
        const GroupUser = await db.query(
            "SELECT (@row_number:=coalesce(@row_number,0) + 1) AS row_num,"+
            "user.id,"+
	        "user.name,"+
            "user.last_name,"+
            "role_group.id as group_id,"+
            "role_group.role_group_name as group_name "+
            "user.status as status_user "+
            "FROM user "+
            "LEFT JOIN role_group "+
            "ON user.role_id = role_group.id "+
            "ORDER BY user.id ASC",
            {
                type: db.QueryTypes.SELECT,
            }
        );
        res.json(GroupUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUsersByAdmin = async(req, res) => {
    try {
        const GroupUser = await db.query(
            "SELECT (@row_number:=coalesce(@row_number,0) + 1) AS row_num,"+
            "user.id,"+
	        "user.name,"+
            "user.last_name,"+
            "role_group.id as group_id,"+
            "role_group.role_group_name as group_name "+
            "user.status as status_user "+
            "FROM user "+
            "LEFT JOIN role_group "+
            "ON user.role_id = role_group.id "+
            "WHERE role_group.id <> 1",
            {
                type: db.QueryTypes.SELECT,
            }
        );
        res.json(GroupUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getUsersByID = async(req, res) => {
    try {
        const GroupUser = await db.query(
            "SELECT (@row_number:=coalesce(@row_number,0) + 1) AS row_num,"+
            "user.id,"+
	        "user.name,"+
            "user.last_name,"+
            "role_group.id as group_id,"+
            "role_group.role_group_name as group_name "+
            "FROM user "+
            "LEFT JOIN role_group "+
            "ON user.role_id = role_group.id "+
            "WHERE user.id = :id",
            {
                replacements: { id: req.params.id },
                type: db.QueryTypes.SELECT,
            }
        );
        res.json(GroupUser);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// export const getCheckId = async (req, res) => {
//   try {
//     const checkUser = await db.query(
//       "SELECT count(*) AS COUNT_ FROM user ", //where username = :user",
//       {
//         //replacements: { user: req.params.id },
//         type: db.QueryTypes.SELECT,
//       }
//     );
//     res.json(checkUser);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };
  



export const Register = async(req, res) => {
    const { username, 
            password, 
            confirmPassword,
            name,
            last_name,
            role_id } = req.body;
    if(password !== confirmPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const count = await Users.count({
            where: { username: username},
          });

          if (count == 0){
            await Users.create({
                username: username,
                password: hashPassword,
                name : name,
                last_name : last_name,
                role_id : role_id,
                status : 1
            });
            res.json({msg: "Registration Successful"});
          }else{
            return res.status(400).json({msg: "Username Duplicate Data"});
          }
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        //res.status(404).json({msg:"User not found"});
        //res.json({msg:console.log(error)});
        res.status(404).json({msg:"Username and Password not found"});
    }
}


export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}



