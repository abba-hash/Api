import express from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview, approveReview } from "../controllers/reviewController.js";


const reviewRouter = express.Router();

reviewRouter.post("/", createReview)
reviewRouter.get("/all", getAllReviews)
reviewRouter.get("/:slug", getReviewById)
reviewRouter.put("/:id", updateReview)
reviewRouter.delete("/:id", deleteReview)
reviewRouter.put("/:id/approve-request", approveReview)

export default reviewRouter