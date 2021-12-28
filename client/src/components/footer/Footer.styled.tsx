import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { SocialIconProps } from "./Footer.types";

export const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: 'column' })}
`
export const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
`

export const Logo = styled.h1`
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 2rem;
    text-transform: uppercase;
`
export const Description = styled.p`
   margin: 1.25rem 0;
`

export const SocialContainer = styled.div`
    display: flex;
`

export const SocialIcon = styled.div<SocialIconProps>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${({ color }) => color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

export const Center = styled.div`
    flex: 1;
    padding: 1.25rem;
    ${mobile({ display: 'none' })}
`
export const Title = styled.h3`
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.75rem;
    margin-bottom: 1.875rem;
`;

export const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

export const ListItem = styled.li`
    width: 50%;
    margin-bottom: 0.625rem;
`;

export const Right = styled.div`
    flex: 1;
    padding: 1.25rem;
`

export const ContactItem = styled.div`
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
`;

export const Payment = styled.img`
    width: 50%;
`;