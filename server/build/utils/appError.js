"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode || 500;
        this.status = statusCode.toString().startsWith('5') ? 'error' : 'fail';
    }
}
exports.default = AppError;
