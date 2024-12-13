import express from "express";
import { protect } from "../middlewares/authMiddleware.js"
import { createVendor, getVendors, getVendorBySlug, updateVendor, deleteVendor } from "../controllers/vendorController.js";

const vendorRouter = express.Router();

// create vendor
vendorRouter.post("/", protect, createVendor)

// get vendor routes
vendorRouter.get("/all", getVendors)

// get vendor slug routes
vendorRouter.get("/:slug", getVendorBySlug)

// update vendor routes
vendorRouter.put("/:id", updateVendor)


// delete  vendor routes
vendorRouter.delete("/:id", deleteVendor)


export default vendorRouter;