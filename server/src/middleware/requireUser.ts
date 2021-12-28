import { NextFunction, Request, Response } from "express";
import { findUser } from "../services/user.services";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";

const requireUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // 1. Check for userId on request object
    if (!req.session.userId) return next(new AppError('You are not logged in! Please log in to get access.', 401))
    
    // 2. Check if the user still exists
    const user = await findUser({ _id: req.session.userId });

    if (!user) return next(new AppError('User no longer exists.', 401));

    // 3. Check if the user has changed the password after the token was issued
    if (user.changedPasswordAfter(req.session.iat as number)) {
        return next(new AppError('User recently changed password. Please log in again!', 401))
    }

    // 4. Add user to request object
    req.session.user = user
    next();
})

export default requireUser;