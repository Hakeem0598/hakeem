"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// CONNECT-MONGO CONFIG
const sessionStore = connect_mongo_1.default.create({
    mongoUrl: process.env.DB_URL || 'mongodb://localhost:27017/hakeem',
    collectionName: 'sessions'
});
// EXPRESS SESSION CONFIG
const sessionOptions = {
    store: sessionStore,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: true,
        maxAge: parseInt(process.env.SESSION_EXPIRES_IN || '2') * 1000 * 60 * 60,
        secure: process.env.NODE_ENV === 'production' ? true : false
    }
};
exports.default = sessionOptions;
