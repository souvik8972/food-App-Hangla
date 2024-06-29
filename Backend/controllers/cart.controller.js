import UserModel from "../models/user.model.js"
import FoodModel from "../models/foodItem.model.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        let cartItems = await user.cartItems || {};
        


        if (!cartItems[itemId]) {
            cartItems[itemId] = 1;
        } else {
            cartItems[itemId] += 1;
        }
        await UserModel.findByIdAndUpdate({ _id: user.id }, { cartItems: cartItems })

        res.status(200).json({success: true,message:"added item successfully"})


    } catch (error) {
        
        res.status(500).send({ error: error.message });
    }
};

export const removeFromCart = async(req, res) => {

    const userId=req.user.id;
    const itemId=req.body.itemId;
    try {
    const user= await UserModel.findOne({_id:userId});
    if(!user){
        return res.status(404).send({ success: false ,message: "User not found"})
    }

    const cartItems = user.cartItems
    if(cartItems[itemId]>0){
        cartItems[itemId]-=1
    }
        await UserModel.findByIdAndUpdate({ _id: user.id }, { cartItems: cartItems })
        res.status(200).send({ success:true,message: " successfully removed"})
        
    } catch (error) {
        res.status(500).send({ error: error.message });
        
    }


}

//all items
export const allCartItems = async(req, res) => { 
    const userId=req.user.id
    try {
        const user = await UserModel.findById({_id:userId})
        if(!user){
            return res.status(404).send({success:false,message: "User not found"})
        }
        const cartItems = await user.cartItems
        res.status(200).send({success:true,message:"successfully Fetched cart",cartItems})
        
    } catch (error) {
        res.status(500).json({success:false,message: error.message})
        
    }

}