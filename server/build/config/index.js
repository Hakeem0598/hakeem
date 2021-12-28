"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = exports.corsConfig = void 0;
var corsConfig_1 = require("./corsConfig");
Object.defineProperty(exports, "corsConfig", { enumerable: true, get: function () { return __importDefault(corsConfig_1).default; } });
var sessionConfig_1 = require("./sessionConfig");
Object.defineProperty(exports, "sessionConfig", { enumerable: true, get: function () { return __importDefault(sessionConfig_1).default; } });
