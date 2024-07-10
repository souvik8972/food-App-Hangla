import express from "express";
import { connectDb } from "./utils/configDb.js";
import cors from "cors";
import bodyParser from "body-parser";
import foodRoute from "./routes/food.route.js"
import userRoute from "./routes/user.route.js"
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";
import path from "path"
import "dotenv/config"

// Create an instance of express
const app = express();

const PORT=process.env.PORT || 3000


// Middleware
app.use('/public', express.static(path.join( 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/api/food",foodRoute)
app.use("/api/user/",userRoute)
app.use("/api/cart/",cartRoute)
app.use("/api/order/",orderRoute)

// Connect to MongoDB
connectDb()
    .then(() => {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });
