import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";


const getCartData = () => {
    let cartData = localStorage.getItem('cart')
    if(cartData == 'null'){
        return []
    }
    else{
        return JSON.parse(cartData)
    }


}

const data = {
    cart: getCartData()
}

export const CartContext = createContext("Initial Value");

export default function CartContextProvider({ children }) {
    const [Cart_state, cart_dispatch] = useReducer(reducer, data);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(Cart_state.cart))
    }, [Cart_state.cart])


    return (
        <CartContext.Provider value={{ Cart_state, cart_dispatch }}>
            {children}
        </CartContext.Provider>
    );
}