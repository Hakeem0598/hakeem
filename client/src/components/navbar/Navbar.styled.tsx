import styled from 'styled-components';
import { MdSearch, MdOutlineShoppingCart } from 'react-icons/md';
import { BadgeProps } from './Navbar.types';
import { mobile } from '../../utils/responsive';


export const Container = styled.nav`
    padding: 1rem 0;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: white;
    border-bottom: 1px solid lightgray;
    ${mobile({ padding: '0.8rem 0rem' })}
`
export const Wrapper = styled.div`
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: '0rem 1rem' })}
`
export const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`
export const Flag = styled.span`
    width: 15px;
    height: 15px;
    background-position: -150px -360px;
    line-height: 1.25rem;
    display: inline-block;
    background-repeat: no-repeat;
    background-image: url(https://www.selfridges.com/GB/en/features/dam/country-flags/sprite.svg);
`

export const LanguageContainer = styled.span`
    margin-left: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
`

export const Language = styled.span`
    font-weight: 700;
`

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid lightgray;
    padding: 0.25rem;
`
export const Input = styled.input`
    &:focus {
        outline: none;
    }

    ${mobile({ width: '3.125rem' })}
`
export const Search = styled(MdSearch)`
    color: gray;
    font-size: 1.125rem;
    line-height: 1.75rem;
`
export const Center = styled.div`
    flex: 1;
    text-align: center;
    ${mobile({ textAlign: 'left' })}
`


export const Logo = styled.h1`
    font-weight: bold;
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-transform: uppercase;
    ${mobile({ fontSize: '1.5rem', lineHeight: '2rem' })}
`

export const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* ${mobile({ justifyContent: 'center', flex: '1'})} */

    * + * {
        margin-left: 1rem;
    }

    @media only screen and (max-width: 640px) {
        * + * {
            margin-left: 0.625rem;
        }
    }
`

export const MenuItem = styled.a`
    font-size: 1rem;
    cursor: pointer;
    text-transform: uppercase;
    ${mobile({ fontSize: '0.75rem' })}
`

export const ShoppingCart = styled(MdOutlineShoppingCart)`
    font-size: 1.5rem;
    line-height: 2rem;
`


export const Badge = styled.div<BadgeProps>`
    position: relative;

    &::before {
        content: '${({ count }) => count}';
        position: absolute;
        top: -40%;
        left: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 0.125rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: black;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: #FFE256;
    }
`