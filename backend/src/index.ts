import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/db.connect";
import authRouter from "./apis/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());




app.use("/api/auth",authRouter );

// Connect to MongoDB and start the server
connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });
