import expressAsyncHandler from "express-async-handler";
import {Vendor} from "../models/vendorModel.js"
import {AppError} from "../middlewares/errorHandler.js"

//@desc Create a new vendor
//@router /api/vendors
//@private access protected

export const createVendor= expressAsyncHandler(async (req, res) => {
    try {
        const newVendor = await Vendor.create(req.body);
        res.status(201).json({status: true, data: newVendor});
    } catch (error) {
        throw new AppError("Something went wrong", 400);
    }
});


//@desc Get vendor
//@router /api/vendors/
//@Public access

export const getVendors = expressAsyncHandler(async (req, res) => {
    try {
        const Vendors = await Vendor.find().populate("user")//.populate("products");
        res.status(201).json({status: true, data: Vendors});
    } catch (error) {
        throw new AppError("Something went wrong", 400);
    }
});

//@desc Get vendor by slug
//@router /api/vendor/:slug
//@Public access

export const getVendorBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findOne({slug: req.params.slug}).populate("user", "-password");
        res.status(201).json({status: true, data: vendor});
    } catch (error) {
        throw new AppError("Something went wrong", 400);
    }
});


//@desc update vendor by slug
//@router /api/vendors/:id
//@private access

export const updateVendor = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!vendor){
            throw new AppError("Vendor not found", 404);
        }
        res.status(201).json({status: true, data: vendor});
    } catch (error) {
        throw new AppError("Something went wrong", 400);
    }
});



//@desc delete vendor by slug

export const deleteVendor = expressAsyncHandler(async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!vendor){
            throw new AppError("Vendor not found", 404);
        }
        res.status(201).json({status: true, message: "vendor deleted successfully"});
    } catch (error) {
        throw new AppError("Something went wrong", 400);
    }
});