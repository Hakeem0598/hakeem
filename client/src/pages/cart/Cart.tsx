import React, { useMemo } from 'react'
import { MdAdd, MdRemove } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import StripeCheckout, { Token } from 'react-stripe-checkout'

import api from '../../api'
import Announcement from '../../components/announcement/Announcement'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { useActions } from '../../hooks/useAction'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CartItem } from '../../redux/cart/cart.reducer'
import { Bottom, Button, Container, Details, Hr, Icon, Image, Info, PriceDetail, Product, ProductAmount, ProductAmountContainer, ProductColor, ProductDetail, ProductId, ProductName, ProductPrice, ProductSize, Summary, SummaryItem, SummaryItemPrice, SummaryItemText, SummaryTitle, Title, Top, TopButton, TopText, TopTexts, Wrapper } from './Cart.styled'

function Cart() {
    const navigate = useNavigate();
    const { cart: { cartItems, cartQuantity }, user } = useTypedSelector(state => state);
    const { clearCart, addItem, removeItem, clearItemFromCart } = useActions();

    const cartTotal = useMemo(() => {
        return cartItems.reduce((acc, { quantity, price }) => acc + (quantity * price), 0)
    }, [cartItems]);
    
    const handleClick = (method: string, cartItem: CartItem) => () => {
        if (method === 'add') {
            return addItem(cartItem);
        }
        cartItem.quantity > 1 ? removeItem(cartItem) : clearItemFromCart(cartItem)
    }

    const onToken = async (token: Token) => {
        const { id: source } = token;
        const products = cartItems.map(({ id, quantity }) => ({ product: id, quantity }))
        const { data: { order } } = await api.create('/stripe/checkout', { source, amount: cartTotal * 100, products });
        navigate('/success', { state: { id: order._id }})
        clearCart()
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to='/'>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>{`Shopping Bag(${cartQuantity})`}</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled" onClick={() => clearCart()}>CLEAR SHOPPING BAG</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {
                            cartItems.map((cartItem) => {
                                const { image, title, id, quantity, color, size, price } = cartItem;
                                return (
                                    <div key={id}>
                                        <Product>
                                        <ProductDetail>
                                            <Image src={image} />
                                            <Details>
                                                <ProductName>
                                                    <b>Product:</b> {title}
                                                </ProductName>
                                                <ProductId>
                                                    <b>ID:</b> {id}
                                                </ProductId>
                                                <ProductColor color={color} />
                                                <ProductSize>
                                                    <b>Size:</b> {size}
                                                </ProductSize>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Icon>
                                                    <MdRemove onClick={handleClick('remove', cartItem)} />
                                                </Icon>
                                                <ProductAmount>{quantity}</ProductAmount>
                                                <Icon>
                                                    <MdAdd onClick={handleClick('add', cartItem)} />
                                                </Icon>
                                            </ProductAmountContainer>
                                            <ProductPrice>£ {price}</ProductPrice>
                                        </PriceDetail>
                                        </Product>
                                        <Hr />
                                    </div>
                                )
                            })
                        }
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>£ {cartTotal}</SummaryItemPrice>
                        </SummaryItem>
                        
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>£ { (cartTotal && '5.90') || cartTotal}</SummaryItemPrice>
                        </SummaryItem>
                    
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>£ { (cartTotal && '-5.90') || cartTotal}</SummaryItemPrice>
                        </SummaryItem>
                        
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>£ {cartTotal}</SummaryItemPrice>
                        </SummaryItem>

                        {
                            !cartTotal ? (
                                <Link to='/'>
                                    <TopButton type="filled">CONTINUE SHOPPING</TopButton>
                                </Link>
                            ) : !user.currentUser ? (
                                <Link to='/sign-in'>
                                    <TopButton type="filled">SIGN IN TO CHECKOUT</TopButton>
                                </Link>
                            ) : (
                                <StripeCheckout
                                    name="Hakeem." 
                                    description={`Your total is £${cartTotal}`}
                                    currency="GBP"
                                    billingAddress
                                    shippingAddress
                                    amount={cartTotal * 100} 
                                    token={onToken}
                                    stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
                                >
                                    <Button>CHECKOUT NOW</Button>
                                </StripeCheckout>
                            )
                        }
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
}

export default Cart

// Add billing, shipping and email