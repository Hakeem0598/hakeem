import { Request, Response, NextFunction } from "express";

type HandlerFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const catchAsync = (fn: HandlerFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next)
    }
}

export default catchAsync;