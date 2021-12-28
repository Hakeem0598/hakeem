import { Link } from "react-router-dom";
import styled from "styled-components";
import { ContainerProps } from "./Categories.types";

export const Container = styled.div<ContainerProps>`
    flex: 1;
    /* height: 70vh; */
    max-height: 60rem;
    position: relative;

    @media only screen and (max-width: 640px) {
        display: ${({ uid }) => uid === 1 ? "block" : "none"}
    }
`
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const Title = styled.h1`
    color: white;
    margin-bottom: 1.125rem;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 600;
    text-align: center;
`

export const Button = styled(Link)`
    padding: 0.75rem 1.25rem;
    background-color: white;
    border: 1px solid lightgray;
    cursor: pointer;
`

