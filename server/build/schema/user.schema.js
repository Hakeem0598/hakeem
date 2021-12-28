"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        firstName: (0, yup_1.string)().required('First name is required'),
        lastName: (0, yup_1.string)().required('Last name is required'),
        email: (0, yup_1.string)().email('Invalid email').required('Email is required'),
        password: (0, yup_1.string)().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
});
