"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [navSearch, setNavSearch] = useState(""); // shared search from Navbar

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQuantity = existing ? existing.quantity : 0;
      const availableStock = product.stock !== undefined ? product.stock : 999;

      if (currentQuantity >= availableStock) {
        alert("No more stock available for this product! ❌");
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Decrement quantity by 1; remove item if quantity reaches 0
  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
const clearCart = () => {
  setCart([]);
};
  // Remove entire item regardless of quantity
  const removeItemFully = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);//accumulator, item

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,clearCart, removeItemFully, cartCount, navSearch, setNavSearch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
