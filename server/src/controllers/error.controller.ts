import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const handleValidationError = (error: any) => new AppError(`Invalid input data. ${error.message}`, 400);

const handleFieldAlreadyTakenError = (error: any) => {
    const [key, value] = Object.entries(error.keyValue)[0];
    const message = `${key} '${value}' is already taken.`
    return new AppError(message, 400);
}


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = { ...err };

    if (err.name === 'ValidationError') {
        error = handleValidationError(error);
    } else if (err.code === 11000) {
        error = handleFieldAlreadyTakenError(error);
    }
 
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'An unexpected error has occured.'
    })
}