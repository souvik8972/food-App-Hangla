import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
const SECRET_KEY=process.env.SECRET_KEY
export const generateToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email,admin:user.isAdmin},SECRET_KEY,{ expiresIn:"5h"})

}
// Function to verify a JWT token
export const verifyToken = (token) => {
    try {
    
        const decoded = jwt.verify(token, SECRET_KEY);
        
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
}