import React from 'react'
import { Button, Container, Image, Info, Title } from './Categories-Item.styled'
import { CategoriesItemProps } from './Categories.types'

function CategoriesItem({ image, title, url, button, uid }: CategoriesItemProps) {
    return (
        <Container uid={uid}>
            <Image src={image} />
            <Info>
                <Title>{title}</Title>
                <Button to={url}>{button}</Button>
            </Info>
        </Container>
    )
}

export default CategoriesItem
