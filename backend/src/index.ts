import express from "express";
import dotenv from "dotenv";
import { connect } from "./db/db.connect";
import authRouter from "./apis/auth.routes";
import productRouter from "./apis/product.routes";
import sellerRouter from "./apis/seller.routes";
import cookieParser from "cookie-parser";
import userRouter from "./apis/user.routes";
import cors from "cors";
import { isAuthenticated } from "./middleware/authenticated";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: ["http://localhost:5173", `${process.env.FRONTEND_URL}`], // This is the frontend URL
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send({ message: "Welcome!" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/seller", isAuthenticated, sellerRouter);
app.use("/api/user", isAuthenticated, userRouter);

connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });
