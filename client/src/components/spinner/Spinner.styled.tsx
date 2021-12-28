import styled from "styled-components"
import { SpinnerProps } from "./Spinner.types"

export const Container = styled.div<SpinnerProps>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ height }) => height}
`

export const StyledSpinner = styled.div`
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    border: 3px solid lightgray;
    border-top-color: coral;
    animation: spinner 0.7s linear infinite;
`