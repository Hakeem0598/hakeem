import React from 'react'
import { Container, Title } from './Heading.styled'
import { HeadingProps } from './Heading.types'

function Heading({ children, hidden = false }: HeadingProps) {
    return (
        <Container hidden={hidden}>
            <Title>{children}</Title>
        </Container>
    )
}

export default Heading