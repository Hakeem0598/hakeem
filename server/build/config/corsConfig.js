"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = { origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000', credentials: true };
exports.default = corsConfig;
