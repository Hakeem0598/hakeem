import styled from "styled-components";
import { mobile } from "../../utils/responsive";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    width: 40%;
    padding: 1.25rem;
    background-color: white;
    ${mobile({ width: '75%' })}

    > * + * {
        margin-top: 0.5rem;
    }
`;

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
`;

export const Form = styled.form`
    > * + * {
        margin-top: 0.5rem;
    }
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    padding: 0.625rem;
    border: 1px solid lightgray;

    &:focus {
        outline: none;
    }
`;

export const Info = styled.p`
    font-size: 0.75rem;
`;


export const Button = styled.button`
    width: 40%;
    border: none;
    padding: 0.9375rem 1.25rem;
    background-color: teal;
    color: white;
    cursor: pointer;
`;

export const Error = styled.p`
    color: red;
    font-size: 0.875rem;
    line-height: 1.25rem;
`

export const Message = styled.p`
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.25rem;
`