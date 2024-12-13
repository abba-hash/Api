import expressAsyncHandler from "express-async-handler"
import {Product} from "../models/productModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new product
//@router /api/product
//@private access protected


export const createProduct = expressAsyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({status: true, data: newProduct});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all products
//@router /api/product/products
//@public access 


export const getAllProducts = expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).json({status: true, data: products});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a product by slug
//@router /api/product/:slug
//@public access 


export const getProductBySlug = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findOne({slug: req.params.slug});
        res.status(201).json({status: true, data: product});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a product 
//@router /api/product/:id
//@private access 


export const updateProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!product){
            throw new AppError("Product not found", 404)
        }
        res.status(201).json({status: true, data: product});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a product 
//@router /api/product/:id
//@private access 


export const deleteProduct = expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            throw new AppError("Product not found", 404)
        }
        res.status(201).json({status: true, message: "Product deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})