import styled from "styled-components";
import { mobile } from "../../utils/responsive";

export const Container = styled.div`
    /* height: 60vh; */
    padding: 10rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #cbdbf4;

    > * + * {
        margin-top: 1.25rem;
    }
`

export const Title = styled.h1`
    font-size: 4.5rem;
    line-height: 1;
    font-weight: 600;
`
export const Description = styled.p`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 300;
    ${mobile({ textAlign: 'center' })}

`


export const InputContainer = styled.div`
    width: 50%;
    height: 2.5rem;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: '80%' })}
`

export const Input = styled.input`
    flex: 8;
    padding: 0 1.25rem;

    &:focus {
        outline: black;
    }
`

export const Button = styled.button`
    flex: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 2rem;
    height: 100%;
    width: 100%;
`