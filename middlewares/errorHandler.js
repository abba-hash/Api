export const notFoundErrorHandler = (req,res,next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404);
    next(error);
};


export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code to 500 if it is still 200
    res.status(statusCode); // Set response status code
    res.json({
        status: false,
        message: err.message, // Send error message to client
        stack: process.env.NODE_ENV === 'production' ? "" : err.stack, // Only show stack trace in development mode
    });
};

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail":"error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}