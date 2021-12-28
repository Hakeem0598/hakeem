import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { findUsers, findUserAndUpdate, deleteUser, findUser, getStats } from '../services/user.services';
import { omit } from 'lodash';


export const getUsersHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await findUsers(req.body);

    res.status(200).json({
        status: 'success',
        users
    })
})


export const getUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUser({ _id: req.params.userId });

    res.status(200).json({
        status: 'success',
        user
    })
})

export const updateUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUserAndUpdate({ _id: req.params.userId }, req.body);

    res.status(200).json({
        status: 'success',
        user
    })
})

export const deleteUserHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUser({ _id: req.params.userId });

    res.status(204).json({
        status: 'success'
    })
})


export const getMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        status: 'success',
        user: req.session.user
    })
})

export const updateMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password) return next(new AppError('This route is not for password updates. Please use /update-password', 400));

    const filteredBody = omit(req.body, 'role');

    const user = await findUserAndUpdate({ _id: req.session.userId }, filteredBody);

    res.status(200).json({
        status: 'success',
        user
    })
})

export const deleteMeHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUser({ _id: req.session.userId });

    res.status(204).json({
        status: 'success'
    })
})

export const getStatsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const stats = await getStats();

    res.status(200).json({
        status: 'success',
        stats
    })
})