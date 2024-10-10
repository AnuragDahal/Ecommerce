import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/db.connect";
import authRouter from "./apis/auth.routes";
import productRouter from "./apis/product.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173"], // This is the frontend URL
        credentials: true,
    })
);

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });
