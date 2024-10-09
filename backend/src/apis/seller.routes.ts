import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from seller routes");
});
/*
router.post("/create",handleCreateBusineessAcoount or handleCreateSellerAccount);
router.post("/update", handleUpdateSellerAccount);
router.post("/delete", handleDeleteSellerAccount);
router.get("/:id", handleGetSellerAccount);
*/
