import React, { createContext, useState } from "react";
import { client as supabaseApi } from "../data/supabase";
import { toast } from "react-toastify";

const client = supabaseApi;

export const CartContext = createContext();

const updateUserSupabase = (cartItems) => {
  client.auth.updateUser({
    data: {
      cart: cartItems,
    },
  });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (recipe) => {
    const existingItem = cartItems.find((item) => item.id === recipe.id);

    if (existingItem) {
      toast.warning("Item already exists in the cart", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Adjust the duration as needed
      });
      return;
    }

    setCartItems([...cartItems, recipe]);
    updateUserSupabase(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    toast.success("Item added to the cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Adjust the duration as needed
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    updateUserSupabase(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    toast.error("Item removed from the cart!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Adjust the duration as needed
    });
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
