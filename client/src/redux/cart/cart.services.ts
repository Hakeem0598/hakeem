import { CartItem } from './cart.reducer';
import { ActionType } from './cart.types';

export const addItem = (item: CartItem) => {
    return {
        type: ActionType.ADD_ITEM,
        payload: item
    }
}

export const removeItem = (item: CartItem) => {
    return {
        type: ActionType.REMOVE_ITEM,
        payload: item
    }
}

export const clearItemFromCart = (item: CartItem) => {
    return {
        type: ActionType.CLEAR_ITEM_FROM_CART,
        payload: item
    }
}

export const clearCart = () => ({
    type: ActionType.CLEAR_CART
})