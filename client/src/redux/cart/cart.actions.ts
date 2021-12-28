import { CartItem } from './cart.reducer';
import { ActionType } from './cart.types';

type AddItem = {
    type: ActionType.ADD_ITEM,
    payload: CartItem
}

type RemoveItem = {
    type: ActionType.REMOVE_ITEM,
    payload: CartItem
}

type ClearItemFromCart = {
    type: ActionType.CLEAR_ITEM_FROM_CART,
    payload: CartItem
}

type ClearCart = {
    type: ActionType.CLEAR_CART,
}

export type Action = AddItem | RemoveItem | ClearItemFromCart | ClearCart;