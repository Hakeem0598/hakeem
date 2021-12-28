import { Request } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument, UserInput } from '../models/user.model';
import ApiFeatures from '../utils/apiFeatures';

export const createUser = (input: UserInput) => {
    return User.create(input);
}

export const findUser = (filter: FilterQuery<UserDocument>) => {
    return User.findOne(filter);
}

export const findUsers = (req: Request) => {
    const features = new ApiFeatures(User, req.query).sort().limitFields()
    return features.query;
}

export const findUserAndUpdate = (filter?: FilterQuery<UserDocument>, update?: UpdateQuery<UserDocument>, options?: QueryOptions) => {
    
    return User.findOneAndUpdate(filter, update, options);
}

export const deleteUser = (filter?: FilterQuery<UserDocument>, options?: QueryOptions,) => {
    return User.deleteOne(filter, options);
}

export const getStats = async () => {
    try  {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        const stats = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ]);
        
        return stats;
    } catch (error: any) {
        console.log(error.message);
        Promise.reject();
    }
}