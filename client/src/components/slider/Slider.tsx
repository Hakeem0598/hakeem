import React, { useState } from 'react'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { sliderItems } from '../../data';
import { Direction } from './Slider.types';
import { ArrowContainer, Button, Container, Description, Image, ImageContainer, InfoContainer, Slide, Box, Title, Wrapper } from './Slider.styled';


function Slider() {
    const [index, setIndex] = useState(0);

    const handleClick = (direction: Direction) => {
        if (direction === 'left') {
            setIndex(prevIndex => prevIndex > 0 ? prevIndex - 1 : 1)
        } else if (direction === 'right') {
            setIndex(prevIndex => prevIndex < 1 ? prevIndex + 1 : 0)
        }
    }

    return (
        <Container>
            <ArrowContainer position='left' onClick={() => handleClick('left')}>
                <MdOutlineArrowLeft />
            </ArrowContainer>
            <Wrapper index={index}>
                {
                    sliderItems.map(({ id, title, image, desc, color, bg }) => (
                        <Slide color={color} bg={bg} key={id}>
                            <Box>
                                <ImageContainer>
                                    <Image src={image} />
                                </ImageContainer>
                                <InfoContainer>
                                    <Title>{title}</Title>
                                    <Description>{desc}</Description>
                                    <Button>SHOP NOW</Button>
                                </InfoContainer>
                            </Box>
                        </Slide>
                    ))
                }
            </Wrapper>
            <ArrowContainer position='right' onClick={() => handleClick('left')}>
                <MdOutlineArrowRight />
            </ArrowContainer>
        </Container>
    )
}

export default Slider
