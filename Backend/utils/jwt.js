import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const SECRET_KEY=process.env.SECRET_KEY
export const generateToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email,admin:user.isAdmin||false},SECRET_KEY,{ expiresIn:"5h"})

}
export const verifyToken=(token)=>{ 
    try {
        return jwt.verify(token,SECRET_KEY)
    } catch (error) {
        return null
    }
 }