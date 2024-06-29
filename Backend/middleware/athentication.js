import { verifyToken } from "../utils/jwt.js";
export const athentication=async(req,res,next)=>{

    const token=req.header("Authorization").split(" ")[1];

    const decodedToken=verifyToken(token)
    
    if (!decodedToken) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user=decodedToken
    next()

}