import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Announcement from '../../components/announcement/Announcement'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/newsletter/Newsletter'
import Products from '../../components/products/Products'
import { Container, Filter, FilterContainer, FilterText, Option, Select, Title } from './Products-page.styled'
import { Filters } from './Products-page.types'
import parseQueryString from '../../utils/parseQuery';
import { omit } from 'lodash';


function ProductsPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const { search } = useLocation();
    
    const query = new URLSearchParams(search);
    const sort = query.get('sort') || 'newest';
    const color = query.get('color') || 'all';
    const size = query.get('size') || 'all';

    const [queryObject, setQueryObject] = useState({ sort, color, size } as any);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let queryString;
        const { name, value } = event.target;

        if (search) {
            const queryObject = { ...parseQueryString(search), [name]: value };
            queryString = Object.entries(queryObject)
                .map(([key, value]) => `${key}=${value}`)
                .join('&')
            setQueryObject(queryObject);
        } else {
            queryString = `${name}=${value}`
            setQueryObject({ [name]: value})
        }
        navigate(`?${queryString}`)
    }

    const { sort: sortBy } = queryObject;
    const filters = omit(queryObject, ['sort']) as Filters

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{category}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Color:</FilterText>
                    <Select onChange={handleChange} value={color} name='color'>
                        <Option value='all'>All</Option>
                        <Option value='white'>White</Option>
                        <Option value='black'>Black</Option>
                        <Option value='red'>Red</Option>
                        <Option value='blue'>Blue</Option>
                        <Option value='yellow'>Yellow</Option>
                        <Option value='green'>Green</Option>
                    </Select>
                    <FilterText>Size:</FilterText>
                    <Select onChange={handleChange} value={size} name='size'>
                        <Option value='all'>All</Option>
                        <Option value='xs'>XS</Option>
                        <Option value='s'>S</Option>
                        <Option value='m'>M</Option>
                        <Option value='l'>L</Option>
                        <Option value='xl'>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={handleChange} value={sort} name='sort'>
                    <Option value='newest' selected>Newest</Option>
                    <Option value='asc'>Price (asc)</Option>
                    <Option value='desc'>Price (desc)</Option>
                </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sortBy}  />
            <Newsletter />
            <Footer />
        </Container>
    )
}


export default ProductsPage
