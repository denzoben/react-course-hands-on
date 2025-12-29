import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    onAddToCart: () => { },
    onUpdateCartItemQuantity: () => { },
});

function CartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,   // this is not applicable over here as the state as only one item to update.
            items: updatedItems,
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }
    return state;
}

export function CartContextProvider({ children }) {

    const [CartState, CartDispatch] = useReducer(CartReducer,
        {
            items: [],
        }
    );


    function handleAddItemToCart(id) {
        CartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        CartDispatch({
            type: 'UPDATE_ITEM',
            payload: { productId, amount }
        });
    }

    const shopCartValue = {
        items: CartState.items,
        onAddToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
    }

    return <CartContext.Provider value={shopCartValue}>{children}</CartContext.Provider>;
}