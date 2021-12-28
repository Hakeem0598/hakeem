import { removeItemFromCart, addItemToCart, clearItemFromCart } from './cart.utils';
import { ActionType } from "./cart.types"
import { Action } from './cart.actions';

export type CartItem = {
    id: string;
    size: string;
    color: string;
    quantity: number;
    title: string;
    image: string;
    price: number;
}

export type CartState = {
    cartItems: CartItem[];
    cartQuantity: number;
}

const INITIAL_STATE = {
    cartItems: [],
    cartQuantity: 0
}

const cartReducer = (state: CartState = INITIAL_STATE, action: Action): CartState => {
    switch(action.type) {
        case ActionType.ADD_ITEM:
            return {
                cartItems: addItemToCart(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity + action.payload.quantity
            }

        case ActionType.REMOVE_ITEM:
            return {
                cartItems: removeItemFromCart(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity - 1
            }

        case ActionType.CLEAR_ITEM_FROM_CART:
            return {
                cartItems: clearItemFromCart(state.cartItems, action.payload),
                cartQuantity: state.cartQuantity - action.payload.quantity
            }
        
        case ActionType.CLEAR_CART: 
            return {
                cartItems: [],
                cartQuantity: 0
            }
        
        default:
            return state
    }
}

export default cartReducer;