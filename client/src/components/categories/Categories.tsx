import React from 'react';
import { categories } from '../../data';
import CategoriesItem from '../categories-item/Categories-Item';
import { Container } from './Categories.styled';

function Categories() {
    return (
        <Container>
            {
                categories.map((category) => (
                    <CategoriesItem {...category} key={category.id} uid={category.id} />
                ))
            }
        </Container>
    )
}

export default Categories
