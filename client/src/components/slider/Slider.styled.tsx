import styled from 'styled-components';
import { laptop, mobile } from '../../utils/responsive';
import { ArrowContainerProps, SlideProps, WrapperProps } from './Slider.types';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    max-height: 60rem;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: 'none' })}
`

export const Wrapper = styled.div<WrapperProps>`
    height: 100%;
    display: flex;
    transform: translateX(${({ index }) => index * -100}vw);
    transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
`

export const Slide = styled.div<SlideProps>`
    width: 100vw;
    height: 100vh;
    max-height: 60rem;
    background-color: ${({ bg }) => bg};
    color: ${({ color }) => color};
`
export const Box = styled.div`
    width: 100%;
    height: 100%;
    max-width: 100rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
`

export const ImageContainer = styled.div`
    height: 100%;
`

export const Image = styled.img`
    height: 100%;
`

export const InfoContainer = styled.div`
    padding-right: 3rem;

    * + * {
        margin-top: 2rem;
    }

    ${laptop({  marginLeft: '-20rem' })}
`

export const Title = styled.h1`
    font-size: 3.75rem;
    line-height: 1;
    font-weight: 600;
`
export const Description = styled.p`
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    letter-spacing: 0.025em;
`
export const Button = styled.button`
    padding: 0.5rem 2rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    cursor: pointer;
    border: 1px solid lightgray;
    background-color: white;
`

export const ArrowContainer = styled.div<ArrowContainerProps>`
    width: 3rem;
    height: 3rem;
    background-color: whitesmoke;
    border-radius: 100%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    ${({ position }) => position}: 1rem;
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 100;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    

    &:hover {
        opacity: 1;
    }
`