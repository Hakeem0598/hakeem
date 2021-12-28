import React from 'react'
import { MdOutlineShoppingCart,  MdFavoriteBorder } from 'react-icons/md';
import { ProductProps } from './Product.types';
import { Container, CustomLink, Icon, Image, Actions, Info, Wrapper, ProductTitle, ProductPrice } from './Product.styled';
import { useActions } from '../../hooks/useAction';

function Product({ image, slug, _id, description, title, price, colors, sizes }: ProductProps) {
    const { addItem } = useActions();

    const handleClick = () => {
        addItem({ id: _id, quantity: 1, color: colors[0], size: sizes[0], title, image, price })
    }

    return (
        <Container>
            <Wrapper>
                <Image src={image} />
                <CustomLink to={`/product/${slug}/${_id}`} state={{ image, description, title, price, colors, sizes }} />
                <Actions>
                    <Icon onClick={handleClick}>
                        <MdOutlineShoppingCart />
                    </Icon>
                    <Icon>
                        <MdFavoriteBorder />
                    </Icon>
                </Actions>
                
            </Wrapper>
            <Info>
                <ProductTitle>NEW</ProductTitle>
                <ProductTitle>{title}</ProductTitle>
                <ProductPrice>{price} GBP</ProductPrice>
            </Info>
        </Container>

    )
}

export default Product
