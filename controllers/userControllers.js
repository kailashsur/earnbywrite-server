// controllers/userController.js
import { extractNameFromEmail, getUsernameByEmail, userformateDatatoSend } from "../lib/methodLib.js";
import { emailRegex, passwordRegex } from "../lib/regX.js";
import bcrypt from "bcryptjs"
// db schema import
import User from "../models/User.js";


class UserClass {

    // ---signup user
    async createUser(req, res){
        const data = req.body;

        if (!data.email.length) {
            return res.status(403).json({ "error": "Enter Email" })
        }
        if (!emailRegex.test(data.email)) {
            return res.status(403).json({ "Error": "Email is invalid" })
        }
        if (!passwordRegex.test(data.password)) {
            return res.status(403).json({ "Error": "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters" })
        }
    

        try {
            let username = await getUsernameByEmail(data.email)
            const user = await User.create({
                fullname : extractNameFromEmail(data.email),
                email : data.email,
                username : username,
                password : req.hashedPassword,
            })

            res.status(200).json({message : "User Created Successfully",user : userformateDatatoSend(user)})
        } catch (error) {
            error.code == 11000 ? res.status(500).json({error : "Email alredy exist"}) : res.status(500).json({error : error.message})
        }
    }
    //-------------------------

    //------Login User
    async loginUser(req, res){
        const data = req.body;

        try {
            const user = await User.findOne({"email" : data.email});

            if(!user){ return res.status(403).json({"Error" : "Email Not Found"})}

            if(!user.google_auth){
                bcrypt.compare(data.password, user.password, function(error, result){
                    if(error){
                        return res.status(403).json({error : "error on verify password, please try again"})
                    }

                    if(!result){
                        return res.status(403).json({error : "Invalid Password"})
                    } else{
                        return res.status(200).json(userformateDatatoSend(user))
                    }
                })
            }else {
                return res.status(403).json({error : "Account was created with Google, Please try with google"})
            }

        } catch (error) {
            return res.status(500).json({error : error.message});
        }
    }

}
const userControllers = new UserClass();
export default userControllers;


// Add more controller functions as needed (e.g., createUser, getUserById, etc.)
