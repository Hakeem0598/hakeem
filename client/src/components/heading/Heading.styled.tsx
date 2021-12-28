import styled from "styled-components"
import { ContainerProps } from "./Heading.types"

export const Container = styled.div<ContainerProps>`
    text-align: center;
    margin-top: 4rem;
    display: block;
    
    @media only screen and (max-width: 640px) {
        display: ${({ hidden }) => hidden ? 'none' : 'block'};
    }
`

export const Title = styled.h2`
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
`

