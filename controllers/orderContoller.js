import { Order } from "../models/orderModel.js";
import expressAsyncHandler from "express-async-handler";
import { AppError } from "../middlewares/errorHandler.js";

//@desc Create a new Order
//@router /api/order
//@private access protected

export const createOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get all Order
//@router /api/order/orders
//@public access

export const getAllOrders = expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("user items.product");
    res.status(201).json({ status: true, data: orders });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Get Order
//@router /api/order/:id
//@private access

export const getOrderById = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user items.product"
    );
    res.status(201).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Update Order
//@router /api/order/:id
//@private access

export const updateOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }
    res.status(201).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc delete Order
//@router /api/order/:id
//@private access

export const deleteOrder = expressAsyncHandler(async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }
    res
      .status(201)
      .json({ status: true, message: "Order deleted successfully" });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc update Order Status
//@router /api/order/:id
//@private access

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error, 400);
  }
});

//@desc Handle Order Cancellation
//@router /api/order/
//@private access

export const handleOrderCancellation = expressAsyncHandler(async (req, res) => {
  try {
    const { reason } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled", cancellation: { reason, createdAt: new Date() } },
      { new: true }
    );
    if (!order) {
      return res.status(400).json({
        status: false,
        message: "Order not found",
      });
    }
    res.status(200).json({ status: true, data: order });
  } catch (error) {
    throw new AppError(error, 400);
  }
});


//@desc Handle Order Return
//@router /api/order/
//@private access

export const handleOrderReturn = expressAsyncHandler(async (req, res) => {
    try {
      const { reason } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { return: { reason, status: "pending", createdAt: new Date() } },
        { new: true }
      );
      if (!order) {
        return res.status(400).json({
          status: false,
          message: "Order not found",
        });
      }
      res.status(200).json({ status: true, data: order });
    } catch (error) {
      throw new AppError(error);
    }
  });

  //@desc Handle Order Return Status
//@router /api/order/
//@private access

export const handleOrderReturnStatus = expressAsyncHandler(async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findOneAndUpdate(
        {_id: req.params.id, "return.status" : "pending"},
        { "return.status": status },
        { new: true }
      );
      if (!order) {
        return res.status(400).json({
          status: false,
          message: "Order not found or return already",
        });
      }
      res.status(200).json({ status: true, data: order });
    } catch (error) {
      throw new AppError(error);
    }
  });
