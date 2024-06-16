import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/errorHandler';

// Middleware to handle errors
export const handleError = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Error handling logic here
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === "PRODUCTION") {
        let error = { ...err };
        error.message = err.message;

        // Wrong Mongoose Object Error Handler
        if (err.name === "CastError") {
            const castError = err as any;
            const message = `Resource not found with id of ${castError.path}`;
            error = new ErrorHandler(message, 400);
        }

        if (err.name === "CastError") {
            const castError = err as any;
            const message = `Resource not found with id of ${castError.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Errors
        if (err.name === "ValidationError") {
            const ValidationError = err as any;
            const message: any = Object.values(ValidationError.errors).map(val => ValidationError.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        // if (err.code === 11000) {
        //     const message = `Dupicate ${Object.keys(err.keyValue)} entered!`
        //     // const message = "Duplicate field value entered";
        //     error = new ErrorHandler(message, 400);
        // }

        // Handling wrong JWT error
        if (err.name === "JsonWebTokenError") {
            const message = "Invalid Toke. Please try again!"
            error = new ErrorHandler(message, 400);
        }

        // Handling Expired JWT error
        if (err.name === "TokenExpiredError") {
            const message = "Expired Token. Please try again!"
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}