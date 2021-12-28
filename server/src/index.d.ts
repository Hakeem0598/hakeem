import { UserDocument } from './models/user.model';

declare module 'express-session' {
    interface SessionData {
        userId?: UserDocument['_id'],
        user: UserDocument,
        iat: number
    }
}