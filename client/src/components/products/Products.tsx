import React, { useEffect, useState } from 'react'
import api from '../../api'
import Product from '../product/Product'
import { ProductProps } from '../product/Product.types';
import Spinner from '../spinner/Spinner';
import { Container } from './Products.styled'
import { ProductsProps, Sort } from './Products.types'

function Products({ category = 'men', filters, sort, limit }: ProductsProps) {
    const [products, setProducts] = useState();

    useEffect(() => {
        let unmounted = false;

        const getProducts = async () => {
            const sortString = Sort[sort];
            const filterString = Object.entries(filters)
                .filter(([key, value]) => value !== 'all')
                .map(([key, value]) => `${key}=${value}`)
                .join('&')

            const limitChoice = limit ? `&limit=${limit}` : '';
            const sortChoice = sortString ? `&sort=${sortString}` : '';
            const filterChoice = filterString ?`&${filterString}` : '';

            const { data: { products } } = await api.get(`/products?category=${category}${sortChoice}${filterChoice}${limitChoice}`);
            if (!unmounted) setProducts(products)
        }

        getProducts()

        return () => {
            unmounted = true
        }

    }, [category, filters, sort, limit]);


    return !products ? (
        <Spinner height='100vh' />
    ) : (
        <Container>
            {
                
                (products as ProductProps[]).map((product: ProductProps) => (
                    <Product {...product} key={product._id} />
                ))
                
            }
        </Container>
    )
}

export default Products
