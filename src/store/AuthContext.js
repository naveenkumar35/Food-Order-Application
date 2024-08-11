import React, { useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import CartContext from './cart-context';

const AuthContext = React.createContext({
  user: null,
  login: (email, password, redirectPath) => {},
  signup: (name, mobile, email, password, confirmPassword, redirectPath) => {},
  logout: () => {},
  saveAddress: (address) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUser(userDoc.data());

        const cartDoc = await getDoc(doc(db, 'carts', user.uid));
        if (cartDoc.exists()) {
          cartCtx.initializeCart(cartDoc.data());
        }
      } else {
        setUser(null);
        cartCtx.clearCart();
      }
    });

    return () => unsubscribe();
  }, [cartCtx]);
  

  const signupHandler = async (name, mobile, email, password, confirmPassword, redirectPath) => {
    if (password !== confirmPassword) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        mobile,
        email,
        address: '',
      });
      setUser({ uid: user.uid, name, mobile, email, address: '' });
      navigate(redirectPath || '/');
    } catch (error) {
      console.error("Signup error: ", error);
    }
  };

  const loginHandler = async (email, password, redirectPath) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setUser(userDoc.data());

      const cartDoc = await getDoc(doc(db, 'carts', user.uid));
      if (cartDoc.exists()) {
        cartCtx.initializeCart(cartDoc.data());
      }

      navigate(redirectPath || '/');
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setUser(null);
      cartCtx.clearCart();
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  const saveAddressHandler = async (address) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), { address }, { merge: true });
        setUser((prevUser) => ({ ...prevUser, address }));
      } catch (error) {
        console.error("Error saving address: ", error);
      }
    }
  };

  const contextValue = {
    user,
    login: loginHandler,
    signup: signupHandler,
    logout: logoutHandler,
    saveAddress: saveAddressHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
