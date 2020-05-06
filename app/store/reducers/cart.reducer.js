import {ADD_TO_CART, REMOVE_FROM_CART} from "../actions/cart.action";
import CartItem from "../../models/cart-item";

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const product = action.product;
            const price = product.price;
            const title = product.title;

            let cartItem;

            if (state.items[product.id]) {
                let item = state.items[product.id];
                cartItem = new CartItem(item.quantity + 1, price, title, item.total + price);
            } else {
                cartItem = new CartItem(1, price, title, price);
            }

            return {
                ...state,
                items: {...state.items, [product.id]: cartItem},
                totalAmount: state.totalAmount + price
            }
        case REMOVE_FROM_CART:
            const curQty = state.items[action.pId].quantity;
            const cartItemToRemove = state.items[action.pId];
            let updatedCartItems;
            if(curQty > 1) {
                const updatedCartItem = new CartItem(
                    cartItemToRemove.quantity - 1,
                    cartItemToRemove.price,
                    cartItemToRemove.title,
                    cartItemToRemove.total - cartItemToRemove.price
                );
                updatedCartItems = {...state.items, [action.pId]: updatedCartItem};
            }else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pId];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - cartItemToRemove.price
            };
    }
    return state;
}
