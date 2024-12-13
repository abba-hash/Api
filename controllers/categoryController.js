import expressAsyncHandler from "express-async-handler"
import {Category} from "../models/categoryModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new category
//@router /api/category
//@private access protected


export const createCategory = expressAsyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({status: true, data: newCategory});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all categorys
//@router /api/category/categorys
//@public access 


export const getAllCategorys = expressAsyncHandler(async (req, res) => {
    try {
        const categorys = await Category.find();
        res.status(201).json({status: true, data: categorys});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a category by slug
//@router /api/category/:slug
//@public access 


export const getCategoryBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({slug: req.params.slug});
        res.status(201).json({status: true, data: category});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a category 
//@router /api/category/:id
//@private access 


export const updateCategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!category){
            throw new AppError("Category not found", 404)
        }
        res.status(201).json({status: true, data: category});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a category 
//@router /api/category/:id
//@private access 


export const deleteCategory = expressAsyncHandler(async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            throw new AppError("Category not found", 404)
        }
        res.status(201).json({status: true, message: "Category deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})