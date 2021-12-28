import styled from "styled-components";
import { mobile } from "../../utils/responsive";
import { FilterColorProps } from "./Product-page.types";

export const Container = styled.div``

export const Wrapper = styled.div`
    padding: 3.125rem;
    display: flex;
    ${mobile({ padding: '0rem', flexDirection: 'column' })}

    > * + * {
        margin-left: 3.125rem;
    }

    @media only screen and (max-width: 640px) {
        > * + * {
            margin-left: 0rem;
        }
    }
`
export const ImageContainer = styled.div`
    flex: 1;
    ${mobile({ backgroundColor: '#EEEEEE' })}
    
`
export const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: '70vh' })}
`

export const InfoContainer = styled.form`
    flex: 1;
    ${mobile({ padding: '1rem' })}

    > * + * {
        margin-top: 1.25rem;
    }
`

export const Title = styled.h1`
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 2.25rem;
`

export const Description = styled.p`
    font-weight: 300;
    letter-spacing: 0.025em;
`
export const Price = styled.p`
    font-weight: 500;
    font-size: 2.25rem;
    line-height: 2.5rem;
`

export const FilterContainer = styled.div`
    width: 50%;
    margin: 1.875rem 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: '100%' })}

`

export const Filter = styled.div`
    display: flex;
    align-items: center;

    > * + * {
        margin-left: 0.25rem;
    }
`

export const FilterTitle = styled.span`
    font-size: 1.25rem;
    font-weight: 200;
`;

export const FilterText = styled.span`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
`

export const FilterColor = styled.div<FilterColorProps>`
    position: relative;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background-color: ${({ color }) => color};
    margin: 0px 0.3125rem;
`;

export const FilterRadio = styled.input`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    left: 0%;
    transform: translate(-25%, -15%);
    opacity: 0;
    cursor: pointer;
`

export const FilterSize = styled.select`
    margin-left: 0.625rem;
    padding: 0.3125rem;
    border: 1px solid lightgray;

    &:focus {
        outline: none;
    }
`;

export const FilterSizeOption = styled.option``;

export const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: '100%' })}
`;

export const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

export const Icon = styled.div`
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 2rem;
`

export const Amount = styled.input`
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 0.625rem;
    border: 1px solid teal;
    text-align: center;
    margin: 0px 0.3125rem;
`;
// export const Amount = styled.span`
//     width: 1.875rem;
//     height: 1.875rem;
//     border-radius: 0.625rem;
//     border: 1px solid teal;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0px 0.3125rem;
// `;

export const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`