import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (recipe) => {
    const existingItem = cartItems.find((item) => item.id === recipe.id);

    if (existingItem) {
      console.log("Item already exists in the cart");
      return;
    }

    setCartItems([...cartItems, recipe]);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    localStorage.setItem("cartItems", JSON.stringify(prevItems));
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
