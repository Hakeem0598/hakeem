import { object, string } from 'yup';

export const signInSchema = object({
    body: object({
        email: string().email('Invalid email').required('Email is required'),
        password: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
})

export const updatePasswordSchema = object({
    body: object({
        currentPassword: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
        newPassword: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
})

export const forgotPasswordSchema = object({
    body: object({
        email: string().email('Invalid email').required('Email is required')
    })
})

export const resetPasswordSchema = object({
    body: object({
        password: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required')
    }),
    params: object({
        token: string().required('A token is required')
    })
})