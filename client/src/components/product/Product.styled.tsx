import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Actions = styled.div`
    opacity: 0;
    font-size: 1.25rem;
    line-height: 1.75rem;
    bottom: 10%;
    z-index: 100;
    position: absolute;
    display: flex;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    > * + * {
        margin-left: 0.75rem;
    }
`

export const CustomLink = styled(Link)`
    opacity: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
`

export const Wrapper = styled.div`
    flex: 1;
    /* min-width: 17.5rem; */
    height: 22rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEEEEE;
    position: relative;

    &:hover ${Actions}, &:hover ${CustomLink} {
        opacity: 1;
    } 
`

export const Image = styled.img`
    height: 75%;
    z-index: 5;
`

export const Title = styled.h1`
    color: white;
    margin-bottom: 1.125rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
`

export const Button = styled.button`
    padding: 0.75rem 1.25rem;
    background-color: white;
    border: 1px solid lightgray;
    cursor: pointer;
`

export const Icon = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 100%;
    color: black;
    background-color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`

export const Info = styled.div`
    margin-top: 0.25rem;
    font-size: 0.75rem;
    line-height: 1rem;
`

export const Container = styled.div`
    flex: 1;
    margin-bottom: 1rem;
`

export const ProductTitle = styled.p`
    
    font-weight: 500;
`

export const ProductPrice = styled.p`
`