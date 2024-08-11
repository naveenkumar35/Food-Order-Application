import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import ItemDetails from './components/Meals/ItemDetails';
import CartProvider from './store/CartProvider';
import { useState } from 'react';
import TrackingPage from './components/Meals/TrackingPage';
import SummaryPage from './components/Meals/SummaryPage'; // Import SummaryPage
import SignupPage from './components/UI/SignUpPage';
import LoginPage from './components/UI/LoginPage';
import { AuthProvider, useAuth } from './store/AuthContext';

function RequireAuth({ children }) {
  let { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectPath=${location.pathname}`} />;
  }

  return children;
}

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const { user } = useAuth();

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <Header onShowCart={showCartHandler} />
          <main>
            <Routes>
              <Route path="/" element={<Meals />} />
              <Route path="/item/:id" element={<ItemDetails onCloseCart={hideCartHandler} />} />
              <Route path="/tracking" element={<RequireAuth><TrackingPage /></RequireAuth>} />
              <Route path="/summary" element={<RequireAuth><SummaryPage /></RequireAuth>} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
