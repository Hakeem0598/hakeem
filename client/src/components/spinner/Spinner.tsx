import React from 'react'
import { Container, StyledSpinner } from './Spinner.styled'
import { SpinnerProps } from './Spinner.types'

function Spinner({ height }: SpinnerProps) {
    return (
        <Container height={height}>
            <StyledSpinner />
        </Container>
    )
}

export default Spinner
