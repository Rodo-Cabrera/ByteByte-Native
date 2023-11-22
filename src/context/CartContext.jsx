import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState({});


    const addToCart = (product) => {
        const productId = product._id;
      
        setCart((prevCart) => {
          const updatedCart = { ...prevCart };
      
          if (updatedCart[productId]) {
            updatedCart[productId].quantity += 1;
          } else {
            updatedCart[productId] = { ...product, quantity: 1 };
          }
      
          console.log('Nuevo carrito', updatedCart);
          return updatedCart;
        });
      };
      
      const removeFromCart = (product) => {
        setCart((prevCart) => {
          const updatedCart = { ...prevCart };
      
          delete updatedCart[product._id];
      
          return updatedCart;
        });
      };

    const clearCart = () => {
        setCart({})
    };

   

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}