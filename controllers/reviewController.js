import expressAsyncHandler from "express-async-handler"
import {Review} from "../models/reviewModel.js"
import { AppError } from "../middlewares/errorHandler.js"


//@desc Create a new Review
//@router /api/review
//@private access protected


export const createReview = expressAsyncHandler(async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json({status: true, data: newReview});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get all reviews
//@router /api/review/reviews
//@public access 


export const getAllReviews = expressAsyncHandler(async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(201).json({status: true, data: reviews});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc get a review by Id
//@router /api/review/:id
//@public access 


export const getReviewById = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findOne({id: req.params.id});
        res.status(201).json({status: true, data: review});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc update a review 
//@router /api/review/:id
//@private access 


export const updateReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!review){
            throw new AppError("Review not found", 404)
        }
        res.status(201).json({status: true, data: review});
    } catch (error) {
        throw new AppError(error, 400)
    }
})

//@desc delete a review 
//@router /api/review/:id
//@private access 


export const deleteReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if(!review){
            throw new AppError("Review not found", 404)
        }
        res.status(201).json({status: true, message: "Review deleted successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})


//@desc updat is approved 
//@router /api/review/approve request
//@private access 


export const approveReview = expressAsyncHandler(async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, {isApproved: req.body.isApproved}, {new: true});
        if(!review){
            throw new AppError("Review not found", 404)
        }
        res.status(201).json({status: true, message: "Review Updated successfully"});
    } catch (error) {
        throw new AppError(error, 400)
    }
})