import React, { useState } from 'react'
import { Button, Container, Error, Form, Input, Link, Title, Wrapper } from './Login.styled'
import { object, string } from 'yup';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';

type FormState = {
    email: string;
    password: string;
}

const formSchema = object({
    email: string().email('Invalid email').required('Email is required'),
    password: string().required('Password is required'),
})

function Login() {
    const { error } = useTypedSelector(state => state.user);
    const [err, setErr] = useState(error);
    const [form, setForm] = useState<FormState>({ email: '', password: '' });
    const { signIn } = useActions();


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await formSchema.validate(form);
            signIn(form.email, form.password);
        } catch (error: any) {
            setErr(error.message)
        }
    }

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                { err && <Error>{err}</Error> }
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Email" aria-label='Email' type='email' name='email' value={form.email} onChange={handleChange} />
                    <Input placeholder="Password" aria-label='Password' type='password' name='password' value={form.password} onChange={handleChange} />
                    <Button type='submit'>LOGIN</Button>
                    <Link to='/forgot-password'>FORGOT PASSWORD?</Link>
                    <Link to='/sign-up'>BECOME A MEMBER</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
