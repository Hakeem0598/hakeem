"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const handleValidationError = (error) => new appError_1.default(`Invalid input data. ${error.message}`, 400);
const handleFieldAlreadyTakenError = (error) => {
    const [key, value] = Object.entries(error.keyValue)[0];
    const message = `${key} '${value}' is already taken.`;
    return new appError_1.default(message, 400);
};
const globalErrorHandler = (err, req, res, next) => {
    let error = Object.assign({}, err);
    if (err.name === 'ValidationError') {
        error = handleValidationError(error);
    }
    else if (err.code === 11000) {
        error = handleFieldAlreadyTakenError(error);
    }
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'An unexpected error has occured.'
    });
};
exports.globalErrorHandler = globalErrorHandler;
