import express from "express";
import { connectDb } from "./utils/configDb.js";
import cors from "cors";
import bodyParser from "body-parser";
import foodRoute from "./routes/food.route.js"
import userRoute from "./routes/user.route.js"
import path from "path"

// Create an instance of express
const app = express();


// Middleware
app.use('/public', express.static(path.join( 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use("/api/food",foodRoute)
app.use("/api/user/",userRoute)

// Connect to MongoDB
connectDb()
    .then(() => {
        // Start the server
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err.message);
    });
