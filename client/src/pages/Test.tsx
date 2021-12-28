import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import parseQueryString from '../utils/parseQuery'

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    > * + * {
        margin-left: 0.625rem;
    }
`

const Select = styled.select`
    border: 1px solid lightgray;
    padding: 0.625rem;

    &:focus {
        outline: none;
    }
`
const Option = styled.option`
`

function Test() {
    const navigate = useNavigate();
    const { search } = useLocation();
    
    const query = new URLSearchParams(search);
    const sort = query.get('sort') || 'recommended';
    const color = query.get('color') || 'recommended';

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let queryString;
        const { name, value } = event.target;

        if (search) {
            const queryObject = { ...parseQueryString(search), [name]: value };
            queryString = Object.entries(queryObject)
                .map(([key, value]) => `${key}=${value}`)
                .join('&')
        } else {
            queryString = `${name}=${value}`
        }
        navigate(`?${queryString}`)
    }

    // Store a queryObject in state
    // Pass the state down the Products
    // In Products { ...queryObject }

    useEffect(() => {
        console.log(search)
    }, [search])

    return (
        <Container>
            <Form>
                <Select name='sort' value={sort as string}  onChange={handleChange}>
                    <Option value='recommended'>Recommended</Option>
                    <Option value='newest'>Newset</Option>
                    <Option value='asc'>Lowest Price</Option>
                    <Option value='desc'>Highest Price</Option>
                </Select>
                <Select name='color' value={color as string}  onChange={handleChange}>
                    <Option value='recommended'>Recommended</Option>
                    <Option value='red'>Red</Option>
                    <Option value='black'>Black</Option>
                    <Option value='white'>White</Option>
                </Select>
            </Form>
        </Container>
    )
}

export default Test
