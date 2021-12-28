import { getMe, signIn, signUp, signOut } from './../redux/user/user.services';
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addItem, removeItem, clearItemFromCart, clearCart } from "../redux/cart/cart.services";

export const useActions = () => {
    const dispatch = useDispatch();

    return bindActionCreators({ addItem, removeItem, clearItemFromCart, clearCart, getMe, signIn, signUp, signOut }, dispatch);
};

