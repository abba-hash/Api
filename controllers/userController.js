import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/utils.js";
import { AppError } from "../middlewares/errorHandler.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  // find the user
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("User already exists", 400);
  }
  // create a new user
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    throw new AppError("Invalid user Data", 400);
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    throw new AppError("Invalid user Data", 400);
  }
});

export const profile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.body;
  const user = await User.findById({ _id });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    });
  } else {
    throw new AppError("User not found", 400);
  }
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.address = req.body.address || user.address;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      isActive: updatedUser.isActive,
      address: updatedUser.address,
    });
  } else {
    throw new AppError("User not found", 400);
  }
});

export const getAllProfile = expressAsyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.json(users);
  } else {
    throw new AppError("User not found", 400);
  }
});


export const deleteUserProfile = expressAsyncHandler(async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.json({message: "User Removed"})
    } catch (error) {
        throw new AppError("User not Found", 400)
    }
    
      throw new AppError("User not found", 400);
    
  });
