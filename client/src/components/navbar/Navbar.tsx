import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Badge, Center, Container, LanguageContainer, Language, Flag, Left, Logo, MenuItem, Right, ShoppingCart, Wrapper } from './Navbar.styled';

function Navbar() {
    const { cart: { cartQuantity }, user: { currentUser } } = useTypedSelector(state => state);
    const { signOut } = useActions();


    return (
        <Container>
            <Wrapper>
                <Left>
                    <Flag />
                    <LanguageContainer>GB / GBP £ <Language>| English</Language></LanguageContainer>
                </Left>
                <Center>
                    <Logo>
                        <Link to='/'>Hakeem.</Link>
                    </Logo>
                </Center>
                <Right>
                    {
                        currentUser ? (
                            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                        ) : (
                            <>
                                <MenuItem href='/sign-in'>Sign in</MenuItem>
                                <MenuItem href='/sign-up'>Register</MenuItem>
                            </>
                        )
                    }
                    <MenuItem href='/cart'>
                        <Badge count={cartQuantity}>
                                <ShoppingCart />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
