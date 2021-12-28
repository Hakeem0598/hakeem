import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    width: 25%;
    padding: 1.25rem;
    background-color: white;
    ${mobile({ width: '75%' })}

`;

export const Title = styled.h1`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 300;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid lightgray;

    &:focus {
        outline: none;
    }
`;

export const DisabledInput = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 0.625rem 0;
    padding: 0.625rem;
    border: 1px solid lightgray;
    cursor: not-allowed;
`

export const Button = styled.button`
    width: 100%;
    border: none;
    padding: 0.9375rem 1.25rem;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 0.625rem;
`;

export const Link = styled(RouterLink)`
    margin: 0.3125rem 0px;
    font-size: 0.75rem;
    text-decoration: underline;
    cursor: pointer;
`;

export const Error = styled.p`
    word-wrap: break-word;
    color: red;
    font-size: 0.875rem;
    line-height: 1.25rem;
`