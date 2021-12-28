import React, { useState } from 'react'
import { Button, Container, Error, Form, Info, Input, Message, Title, Wrapper } from './Forgot-password.styled'
import { string, object } from 'yup';
import api from '../../api';
import axios from 'axios';

const formSchema = object({
    email: string().email('Invalid email').required('Email is required'),
})

function ForgotPassword() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');

    const forgotPassword = (email: string) => api.create('/auth/forgot-password', { email })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await formSchema.validate({ email });
            const { data: { message } } = await forgotPassword(email);
            setResponse(message);
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
                <Title>FORGOT PASSWORD</Title>
                { error ? <Error>{error}</Error> : response && <Message>{response}</Message>}
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Email" aria-label='Email' name='email' type='email' onChange={handleChange} />
                    <Info>Please enter the email address you used to create your account, and we'll send you a link to reset your password.</Info>
                    <Button>SEND RESEST LINK</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default ForgotPassword
