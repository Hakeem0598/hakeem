import React from 'react'
import { BsInstagram, BsFacebook, BsTwitter, BsPinterest } from 'react-icons/bs';
import { MdRoom, MdPhone, MdMailOutline } from 'react-icons/md';
import { Center, ContactItem, Container, Description, Left, List, ListItem, Logo, Payment, Right, SocialContainer, SocialIcon, Title } from './Footer.styled';

function Footer() {
    return (
        <Container>
            <Left>
                <Logo>Hakeem.</Logo>
                <Description>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</Description>
                <SocialContainer>
                    <SocialIcon color='#E4405F'>
                        <BsInstagram />
                    </SocialIcon>
                    <SocialIcon color='#3B5999'>
                        <BsFacebook />
                    </SocialIcon>
                    <SocialIcon color='#55ACEE'>
                        <BsTwitter />
                    </SocialIcon>
                    <SocialIcon color='#E60023'>
                        <BsPinterest />
                    </SocialIcon>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
            <Title>Contact</Title>
                <ContactItem>
                    <MdRoom style={{marginRight:"0.625rem"}}/> 567 Dixie Path , South Tobinchester 98765
                </ContactItem>
                <ContactItem>
                    <MdPhone style={{marginRight:"0.625rem"}}/> +44 71 2345 6789
                </ContactItem>
                <ContactItem>
                    <MdMailOutline style={{marginRight:"0.625rem"}} /> contact@hakeem.dev
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer
