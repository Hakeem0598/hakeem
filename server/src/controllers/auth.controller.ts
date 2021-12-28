import { resetPassword } from '../services/auth.services';
import { Request, Response, NextFunction } from "express";
import { signIn, signUp, updatePassword, forgotPassword } from "../services/auth.services";
import AppError from "../utils/appError";
import catchAsync from '../utils/catchAsync';
import { omit } from 'lodash';


const issueCookie = (req: Request, user: any) => {
    req.session.userId = user._id
    req.session.iat = Date.now();
    user.password = undefined;
};

export const signInHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await signIn(email, password);

    issueCookie(req, user);

    res.status(200).json({
        status: 'success',
        user
    })
})


export const signUpHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, avatar } = req.body;

    const user = await signUp({ 
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: password as string,
        role: 'user',
        avatar
    });

    issueCookie(req, user);

    res.status(200).json({
        status: 'success',
        user
    })
})


export const signOutHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err: any) => {
        if (err) return next(new AppError('Unable to sign out', 400));
        
        res.clearCookie('sid');
        res.status(200).json({ status: 'success' });
    });
})

export const updatePasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;

    const user = await updatePassword(req.session.userId, currentPassword, newPassword);
    
    res.status(200).json({
        status: 'success',
        user: omit(user, 'password')
    })
})

export const forgotPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    await forgotPassword(email);
    
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
    })
})

export const resetPasswordHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password } = req.body;
    
    const user = await resetPassword(token, password);

    issueCookie(req, user);
        
    res.status(200).json({
        status: 'success',
        user
    })
})