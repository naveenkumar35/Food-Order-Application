import React from 'react';

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  saveCartToFirebase: () => {}, // New method to save cart in Firebase
  initializeCart: (cartData) => {},
});

export default CartContext;
