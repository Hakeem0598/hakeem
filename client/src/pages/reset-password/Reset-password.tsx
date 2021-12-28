import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup';
import axios from 'axios';
import { Container, Error, Title, Wrapper, Form, DisabledInput, Input, Button } from './Reset-password.styled';
import api from '../../api';

const formSchema = object({
    password: string().min(8, "Password too short - should be 6 chars minimum").required('Password is required')
})

function ResetPassword() {
    const { token } = useParams();
    const { search } = useLocation();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [password, setPassword] = useState('');

    const params = new URLSearchParams(search);
    const email = params.get('email');

    if (!email || !token) navigate('/');

    const resetPassword = (token: string, password: string) => {
        return api.create(`/auth/reset-password/${token}`, { password });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await formSchema.validate({ password });
            await resetPassword(token as string, password);
            window.location.href = '/';
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                return setError(error.response?.data.message)
            }
            setError(error.message)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>RESET PASSWORD</Title>
                { error && <Error>{error}</Error> }
                <Form onSubmit={handleSubmit}>
                    <DisabledInput aria-label='Email' name='email' type='email' value={email as string} disabled />
                    <Input placeholder="New Password" aria-label='New Password' name='password' type='password' onChange={handleChange} />
                    <Button>SAVE PASSWORD</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default ResetPassword
// http://localhost/api/v1/auth/reset-password/b5b177cb51e32183d813a49f2a2958094a4fbc7867e63963af5f1c9a7abc10fe