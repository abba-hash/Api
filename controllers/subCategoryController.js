import expressAsyncHandler from "express-async-handler"
import {SubCategory} from "../models/subCategoryModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new subCategory
//@router /api/subCategory
//@private access protected


export const createSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const newSubCategory = await SubCategory.create(req.body);
        res.status(201).json({status: true, data: newSubCategory});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all subCategorys
//@router /api/subCategory/subCategorys
//@public access 


export const getAllSubCategorys = expressAsyncHandler(async (req, res) => {
    try {
        const subCategorys = await SubCategory.find();
        res.status(201).json({status: true, data: subCategorys});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a subCategory by slug
//@router /api/subCategory/:slug
//@public access 


export const getSubCategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findOne({slug: req.params.slug});
        res.status(201).json({status: true, data: subCategory});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a subCategory 
//@router /api/subCategory/:id
//@private access 


export const updateSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!subCategory){
            throw new AppError("SubCategory not found", 404)
        }
        res.status(201).json({status: true, data: subCategory});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a subCategory 
//@router /api/subCategory/:id
//@private access 


export const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
        if(!subCategory){
            throw new AppError("SubCategory not found", 404)
        }
        res.status(201).json({status: true, message: "SubCategory deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})