import expressAsyncHandler from "express-async-handler"
import {Wishlist} from "../models/wishlistModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new wishlist
//@router /api/wishlist
//@private access protected


export const createWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const newWishlist = await Wishlist.create(req.body);
        res.status(201).json({status: true, data: newWishlist});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all categorys
//@router /api/wishlist/categorys
//@public access 


export const getAllWishlists = expressAsyncHandler(async (req, res) => {
    try {
        const categorys = await Wishlist.find();
        res.status(201).json({status: true, data: categorys});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a wishlist by Id
//@router /api/wishlist/:id
//@public access 


export const getWishlistById = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        res.status(201).json({status: true, data: wishlist});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a wishlist 
//@router /api/wishlist/:id
//@private access 


export const updateWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!wishlist){
            throw new AppError("Wishlist not found", 404)
        }
        res.status(201).json({status: true, data: wishlist});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a wishlist 
//@router /api/wishlist/:id
//@private access 


export const deleteWishlist = expressAsyncHandler(async (req, res) => {
    try {
        const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
        if(!wishlist){
            throw new AppError("Wishlist not found", 404)
        }
        res.status(201).json({status: true, message: "Wishlist deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})