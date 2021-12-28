import styled from "styled-components";
import { mobile, tablet } from "../../utils/responsive";

export const Container = styled.div`
    padding: 1.25rem;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.5rem;
    max-width: 80rem;
    margin: 0 auto;
    ${tablet({  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' })}
    ${mobile({  gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' })}
`