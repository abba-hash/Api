import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,
    vendorReply:{
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    
},
    { timestamps: true }

);

// create a model from the schema
reviewSchema.index({user:1, product:1}, {unique:true});
export const Review = mongoose.model("Review", reviewSchema);