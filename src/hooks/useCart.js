import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCart = () => {
    
    const cart = useContext(CartContext);

    if (cart === undefined) {
        throw new Error('UseCart no está siendo usado en su contexto')
    }

    return cart
}