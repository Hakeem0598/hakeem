import { object, string } from 'yup';

export const createUserSchema = object({
    body: object({
        firstName: string().required('First name is required'),
        lastName: string().required('Last name is required'),
        email: string().email('Invalid email').required('Email is required'),
        password: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required'),
    })
})