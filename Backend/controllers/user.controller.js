import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import validator from 'validator';

// Signup controller
export const signup = async (req, res) => {
    try {
        const { username, email, password,isAdmin } = req.body;
    

        if (!validator.isEmail(email) ){
            return res.json({success:false, message:"Please enter a valid email address"})
        }

        // Check if the user already exists
        const isUserPresent = await UserModel.findOne({ email });
        if (isUserPresent) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new UserModel({
            username,
            email,
            password: hashPassword,
            isAdmin:isAdmin||false
            
        });
        const user=await newUser.save();
        const token=generateToken(user);

        // Respond with success message
        return res.status(201).json({ success: true, message: "User saved successfully",token });

    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Login controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if password is valid
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user);
        return res.status(200).json({ token, success: true, message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed", error: error.message });
    }
};
