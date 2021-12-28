import { Request, Response, NextFunction } from "express";
import { Role, UserDocument } from "../models/user.model";
import AppError from "../utils/appError";

const restrictTo = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user || !roles.includes(req.session.user.role)) {
        return next(new AppError('You do not have permission to perfom this action.', 403));
    }

    next();
}

export default restrictTo;