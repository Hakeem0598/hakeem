import { CartItem } from './cart.reducer';

export const addItemToCart = (cartItems: CartItem[], itemToAdd: CartItem): CartItem[] => {
    const existingItem = cartItems.find(({ id }) => id === itemToAdd.id);

    if (!existingItem) return [...cartItems, itemToAdd]
    
    return cartItems.map((cartItem) => {
        return cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + itemToAdd.quantity } : cartItem;
    });
}

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem): CartItem[] => {
    return cartItems.map((cartItem) => {
        return cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem;
    });
}

export const clearItemFromCart = (cartItems: CartItem[], itemToClear: CartItem): CartItem[] => {
    return cartItems.filter(({ id }) => id !== itemToClear.id);
}