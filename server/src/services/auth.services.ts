import crypto from 'crypto';
import { createUser } from './user.services';
import { UserInput, UserDocument } from '../models/user.model';
import AppError from "../utils/appError";
import { findUser } from "./user.services"
import sendEmail from '../utils/email';

export const signIn = async (email: string, password: string) => {
    try {
        const user = await findUser({ email }).select('+password');

        if (!user || !(await user.comparePasswords(password))) {
            return Promise.reject(new AppError('Incorrect email or password', 401));
        }
        return user;
    } catch (error: any) {
        console.log(error.message);
        Promise.reject();
    }
};


export const signUp = async (input: UserInput) => {
    return createUser(input);
}

export const updatePassword = async (id: UserDocument['_id'], currentPassword: string, newPassword: string) => {
    try {
        const user = await findUser({ _id: id }).select('+password');

        if (!user || !(await user.comparePasswords(currentPassword))) {
            return Promise.reject(new AppError('Incorrect password. Please try again!', 401));
        }

        user.password = newPassword;

        return user.save();
    } catch (error: any) {
        console.log(error.message);
        Promise.reject();
    }
}

export const forgotPassword = async (email: string) => {
    let user;

    try {
        user = await findUser({ email });

        if (!user) {
            return Promise.reject(new AppError('Email not found.', 400));
        }

        const resetToken = user.createPasswordResetToken();
        await user.save();

        const resetURL = `${process.env.CLIENT_ORIGIN as string}/reset-password/${resetToken}?email=${user.email}`
        const message = `Forgot your password? Click link to reset password ${resetURL}\nIf you didn't forget your password, please ignore this message.`

        await sendEmail({
            email: user.email,
            subject: 'Your password reset token',
            message
        })

    } catch (error) {
        if (user) {
            (user as any).passwordResetToken = undefined;
            (user as any).passwordResetExpires = undefined;
            await user.save()
        }
        Promise.reject(new AppError('There was an error sending the email. Please try again later!', 500));
    }
}

export const resetPassword = async (token: string, password: string) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await findUser({ passwordResetToken: hashedToken, passwordResetExpires: { $gt : Date.now() } });

        if (!user) return Promise.reject(new AppError('Token is invalid or has expired', 400));

        user.password = password;
        (user as any).passwordResetToken = undefined;
        (user as any).passwordResetExpires = undefined;
        await user.save();

        return user;
    } catch (error: any) {
        console.log(error.message);
        Promise.reject();
    }
}