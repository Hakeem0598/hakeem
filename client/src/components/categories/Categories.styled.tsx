import styled from "styled-components"
import { mobile } from "../../utils/responsive"

export const Container = styled.div`
    display: flex;
    padding: 1.25rem;
    padding-bottom: 0;
    max-width: 80rem;
    margin: 0 auto;
    ${mobile({ padding: '0rem', flexDirection: 'column' })}

    > * + * {
        margin-left: 1rem;
    }

    @media only screen and (max-width: 640px) {
        * + * {
            margin-left: 0rem;
        }
    }
`
