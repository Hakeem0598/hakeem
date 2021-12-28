import React from 'react'
import { MdSend } from 'react-icons/md';
import { Button, Container, Description, Input, InputContainer, Title } from './Newsletter.styled';

function Newsletter() {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates for your favourite products.</Description>
            <InputContainer>
                <Input type='text' placeholder='Your email' />
                <Button>
                    <MdSend />
                </Button>
            </InputContainer>

        </Container>
    )
}

export default Newsletter
