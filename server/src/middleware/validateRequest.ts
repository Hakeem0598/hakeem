import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnySchema) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.validate({
        body: req.body,
        params: req.params,
        query: req.query
    });
    next()
})

export default validateRequest