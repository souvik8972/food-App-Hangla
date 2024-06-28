import mongoose, { Types } from "mongoose"


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

})
const FoodModel = mongoose.models.FoodModel || mongoose.model("FoodModel", foodSchema)
export default FoodModel
