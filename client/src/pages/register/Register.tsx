import React, { useState } from 'react'
import { Agreement, Button, Container, Error, Form, Input, Title, Wrapper } from './Register.styled'
import { string, object } from 'yup';
import { useActions } from '../../hooks/useAction';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const formSchema = object({
    firstName: string().required('First name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Invalid email').required('Email is required'),
    password: string().min(8, "Password too short - should be 6 characters minimum").required('Password is required')
})

function Register() {
    const [error, setError] = useState('');
    const [form, setForm] = useState<FormState>({  firstName: '', lastName: '', email: '', password: '' });
    const { signUp } = useActions();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await formSchema.validate(form);
            const { firstName, lastName, email, password } = form;
            signUp(firstName, lastName, email, password);
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                { error && <Error>{error}</Error> }
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="First name"  aria-label='Name' name='firstName' onChange={handleChange} />
                    <Input placeholder="Last name" aria-label='Last name' name='lastName' onChange={handleChange} />
                    <Input placeholder="Email" aria-label='Email' name='email' onChange={handleChange} />
                    <Input placeholder="Password" aria-label='Password' name='password' onChange={handleChange} />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
