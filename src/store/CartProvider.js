import { useReducer, useContext } from 'react';
import CartContext from './cart-context';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

    case 'REMOVE':
      const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
      const existingItem = state.items[existingItemIndex];
      const updatedAmount = state.totalAmount - existingItem.price;
      let newItems;
      if (existingItem.amount === 1) {
        newItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        newItems = [...state.items];
        newItems[existingItemIndex] = updatedItem;
      }
      return {
        items: newItems,
        totalAmount: updatedAmount,
      };

    case 'CLEAR':
      return defaultCartState;

    case 'INIT':
      return {
        items: action.cartData.items || [],
        totalAmount: action.cartData.totalAmount || 0,
      };

    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  const { user } = useAuth();

  const saveCartToFirebase = async (cartData) => {
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), cartData);
      } catch (error) {
        console.error("Error saving cart to Firebase: ", error);
      }
    }
  };

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item });
    const updatedCart = {
      items: [...cartState.items, item],
      totalAmount: cartState.totalAmount + item.price * item.amount,
    };
    if (user) saveCartToFirebase(updatedCart);
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id });
    if (user) saveCartToFirebase(cartState);
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
    if (user) saveCartToFirebase(defaultCartState);
  };

  const initializeCart = (cartData) => {
    dispatchCartAction({ type: 'INIT', cartData });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    initializeCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
