// controllers/food.controller.js

import FoodModel from "../models/foodItem.model.js";

export const saveFood = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        console.log(name, price, description, category);


        // Check if the image file is provided and process the filename
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image file is required' });
        }
        const image_filename = req.file.filename;
        console.log(image_filename, "image_filename")

        // Validate the required fields
        if (!name || !price || !description || !category) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Create a new food item
        const foodItem = new FoodModel({ name, image: image_filename, price, description, category });
        const result = await foodItem.save();

        res.status(201).json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};

export const getFoodItems = async (req, res) => {
    try {

        const FoodsData=await FoodModel.find()
        
        res.status(200).json({data:FoodsData,status:"success"})



    } catch (error) {
        res.status(500).json({status:"error",error:error.message})

    }
}


export const deleteFood = async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await FoodModel.findByIdAndDelete({_id:id});

        if (!result) {
            return res.status(404).json({ status: "error", message: "Food not found" });
        }

        res.status(200).json({ status: "success", message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
