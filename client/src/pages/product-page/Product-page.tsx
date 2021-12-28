import React, { useEffect, useState } from 'react'
import Announcement from '../../components/announcement/Announcement'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/newsletter/Newsletter'
import { MdAdd, MdRemove } from 'react-icons/md';
import { AddContainer, Amount, AmountContainer, Button, Container, Description, Filter, FilterColor, FilterContainer, FilterRadio, FilterSize, FilterSizeOption, FilterTitle, Icon, Image, ImageContainer, InfoContainer, Price, Title, Wrapper } from './Product-page.styled'
import { useParams, useLocation } from 'react-router-dom'
import api from '../../api'
import Spinner from '../../components/spinner/Spinner'
import { isEmpty } from 'lodash';
import { useActions } from '../../hooks/useAction'

type ProductState = {
    image: string;
    description: string;
    title: string;
    price: number;
    colors: string[];
    sizes: string[];
}

type FormState = {
    size: string;
    color: string;
    quantity: number;
}

function ProductPage() {
    const { id } = useParams();
    const { state } = useLocation();
    const { addItem } = useActions();
    const [product, setProduct] = useState<ProductState>({ ...state });
    const [form, setForm] = useState<FormState>({ quantity: 1, color: product.colors[0], size: product.sizes[0] } as FormState);

    useEffect(() => {
        let unmounted = false;

        const getProduct = async () => {
            const { data: { product } } = await api.get(`/products/${id}`);
            if (!unmounted) setProduct(product)
        }

        if (!product.image) getProduct();

        return () => {
            unmounted = true;
        }
    }, [id, product]);

    const handleClick = (num: number) => () => {
        setForm(prev => ({ ...prev, quantity: (prev.quantity > 0 && prev.quantity + num) || 1 }));
    }

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addItem({ ...form, id: (id as string), title: product.title, image: product.image, price: product.price })
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                {
                    isEmpty(product) ? (
                        <Spinner height='100vh' />
                    ) : (
                        <>
                            <ImageContainer>
                                <Image src={product.image} />
                            </ImageContainer>
                            <InfoContainer onSubmit={handleSubmit}>
                                <Title>{product.title}</Title>
                                <Description>{product.description}</Description>
                                <Price>£{product.price}</Price>
                                <FilterContainer>
                                    <Filter role='group' aria-labelledby='color-title'>
                                        <FilterTitle id='color-title'>Color</FilterTitle>
                                        {
                                            product.colors.map(color => (
                                                <FilterColor key={color} color={color}>
                                                    <FilterRadio type='radio' name='color' value={color} aria-label={color} onChange={handleInput}  />
                                                </FilterColor>
                                            ))
                                        }
                                    </Filter>
                                    <Filter>
                                        <FilterTitle>Size</FilterTitle>
                                        <FilterSize name='size' value={form.color} onChange={handleSelect}>
                                            {
                                                product.sizes.map(size => (
                                                    <FilterSizeOption value={size} key={size}>{size.toUpperCase()}</FilterSizeOption>
                                                ))
                                            }
                                        </FilterSize>
                                    </Filter>
                                </FilterContainer>
                                <AddContainer>
                                    <AmountContainer>
                                        <Icon onClick={handleClick(-1)}>
                                            <MdRemove />
                                        </Icon>
                                        <Amount name='quantity' type='number' value={form.quantity} min={1} onChange={handleInput} />
                                        {/* <Amount>{quantity}</Amount> */}
                                        <Icon onClick={handleClick(1)}>
                                            <MdAdd />
                                        </Icon>
                                    </AmountContainer>
                                    <Button type='submit'>ADD TO CART</Button>
                                </AddContainer>
                            </InfoContainer>
                        </>
                    )
                }
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductPage
