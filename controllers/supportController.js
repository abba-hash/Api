import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";
import { Support } from "../models/supportSchema.js";

//@desc Create a new support
//@router /api/support
//@private access protected

export const createSupport = expressAsyncHandler(async (req, res) => {
  try {
    const support = new Support(req.body);
    await support.save();
    res.status(201).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc get all support
//@router /api/support
//@private access protected

export const getAllSupport = expressAsyncHandler(async (req, res) => {
  try {
    const supports = await Order.find().populate(
      "user product assignedTo assignedBy"
    );
    res.status(200).json({ status: true, data: supports });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get support
//@router /api/support/:id
//@private access

export const getSupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findById(req.params.id).populate(
      "user product assignedTo assignedBy"
    );
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "Support query not found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Update support
//@router /api/support/:id
//@private access

export const updateSupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!support) {
      return res.status(400).json({
        status: false,
        message: "Support query not found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete Support
//@router /api/support/:id
//@private access

export const deleteSupportById = expressAsyncHandler(async (req, res) => {
  try {
    const support = await Support.findByIdAndDelete(req.params.id);
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "support not found",
      });
    }
    res
      .status(200)
      .json({ status: true, message: "support deleted successfully" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Assigned A Support
//@router /api/support/:id
//@private access

export const assignSupport = expressAsyncHandler(async (req, res) => {
  try {
    const { assignedTo, assignedBy } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { assignedTo, assignedBy },
      { new: true }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "support not found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Assigned A Support
//@router /api/support/:id
//@private access

export const upadateSupportStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user product assignedTo assignedBy");
    if (!support) {
      return res.status(404).json({
        status: false,
        message: "support not found",
      });
    }
    res.status(200).json({ status: true, data: support });
  } catch (error) {
    throw new AppError(error, 400);
  }
});
