import orderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import Stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // frontend URL

    try {
        const { items, amount, address } = req.body;
        const userId = req.user.id;



        // Convert the total amount to the smallest currency unit (e.g., paisa for INR)
        const totalAmount = Math.round(amount * 100 * 84);

        // Calculate delivery charge (2% of the total amount) and convert to the smallest currency unit
        const deliveryCharge = Math.round(totalAmount * 0.2);

        // Save new order
        const newOrder = new orderModel({
            userId,
            items,
            amount: amount + (deliveryCharge / 100), // Store the amount in the base currency unit
            address
        });
        await newOrder.save();

        // Update user's cart items (clear cart items)
        await UserModel.findByIdAndUpdate(userId, { cartItems: [] });

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100 * 84) // Convert price to the smallest currency unit
            },
            quantity: item.quantity
        }));

        // Add delivery charges as a separate line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge
            },
            quantity: 1
        });

        // Create a checkout session with Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&order_id=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&order_id=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};




const verifyOrder = async (req, res) => {
    try {
        const { order_id, success } = req.body;

        if (success === "true") {
            await orderModel.findByIdAndUpdate({ _id: order_id }, { payment: true });
            return res.status(200).json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete({ _id: order_id });
            return res.status(200).json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error('Error verifying order:', error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
};

 
const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await orderModel.find({ userId: userId });


        res.status(200).json({ success: true, data: orders });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}


export { placeOrder, verifyOrder, userOrders };
