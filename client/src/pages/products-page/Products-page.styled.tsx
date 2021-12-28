import styled from "styled-components";
import { mobile } from "../../utils/responsive";

export const Container = styled.div``

export const Title = styled.h1`
    margin: 1.25rem;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 600;
    text-transform: uppercase;
`

export const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1.25rem;
`

export const Filter = styled.div`
    display: flex;
    align-items: center;
    ${mobile({ display: 'flex', flexDirection: 'column' })}

    > * + * {
        margin-left: 0.25rem;
    }
`
export const FilterText = styled.span`
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.75rem;
`
export const Select = styled.select`
    border: 1px solid lightgray;
    padding: 0.625rem;
    ${mobile({ width: '100%', marginBottom: '1rem'})}

    &:focus {
        outline: none;
    }
`
export const Option = styled.option``