import expressAsyncHandler from "express-async-handler"
import {Brand} from "../models/brandModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new brand
//@router /api/brand
//@private access protected


export const createBrand = expressAsyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.status(201).json({status: true, data: newBrand});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all brands
//@router /api/brand/brands
//@public access 


export const getAllBrands = expressAsyncHandler(async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(201).json({status: true, data: brands});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a brand by slug
//@router /api/brand/:slug
//@public access 


export const getBrandBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findOne({slug: req.params.slug});
        res.status(201).json({status: true, data: brand});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a brand 
//@router /api/brand/:id
//@private access 


export const updateBrand = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!brand){
            throw new AppError("Brand not found", 404)
        }
        res.status(201).json({status: true, data: brand});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a brand 
//@router /api/brand/:id
//@private access 


export const deleteBrand = expressAsyncHandler(async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);
        if(!brand){
            throw new AppError("Brand not found", 404)
        }
        res.status(201).json({status: true, message: "Brand deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})