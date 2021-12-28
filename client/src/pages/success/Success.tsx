import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { Navigate } from 'react-router-dom';

export const Container = styled.div`
`
export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

function Success() {
    const { state } = useLocation();

    return (
        <Container>
            <Navbar />
                <Wrapper>
                    {
                        state ? (
                            `Order has been created successfully. Your order ID is #${state.id}`
                        ) : (
                            <Navigate to='/' />
                        )
                    }
                </Wrapper>
            <Footer />
        </Container>
    )
}

export default Success
