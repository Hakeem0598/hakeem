"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updatePasswordSchema = exports.signInSchema = void 0;
const yup_1 = require("yup");
exports.signInSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().email('Invalid email').required('Email is required'),
        password: (0, yup_1.string)().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
});
exports.updatePasswordSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        currentPassword: (0, yup_1.string)().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
        newPassword: (0, yup_1.string)().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
});
exports.forgotPasswordSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)().email('Invalid email').required('Email is required')
    })
});
exports.resetPasswordSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        password: (0, yup_1.string)().min(8, "Password too short - should be 6 chars minimum").required('Password is required')
    }),
    params: (0, yup_1.object)({
        token: (0, yup_1.string)().required('A token is required')
    })
});
