import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartContext from '../../store/cart-context';
import AddressForm from '../Meals/AddressForm';
import classes from './SummaryPage.module.css';
import { useAuth } from '../../store/AuthContext'; // Import useAuth

const SummaryPage = () => {
  const { user, saveAddress } = useAuth(); // Destructure user and saveAddress
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const { name, phone, address, postalCode, items = [], totalAmount = 0 } = location.state || {};
  const cartCtx = React.useContext(CartContext);

  if (!location.state) {
    return <p>No address provided!</p>;
  }

  const placeOrderHandler = () => {
    cartCtx.clearCart();
    navigate('/tracking', { state: { ...location.state, date: new Date().toLocaleDateString() } });
  };

  const newAddressHandler = () => {
    setShowAddressModal(true);
  };

  const addressFormCloseHandler = async (newAddress) => {
    if (newAddress) {
      await saveAddress(newAddress); // Save new address to Firebase
      navigate('/summary', { state: { ...newAddress, items, totalAmount } }); // Update summary page with new address
    }
    setShowAddressModal(false);
  };

  return (
    <div className={classes.summary}>
      <h2>Order Summary</h2>
      <div className={classes.address}>
        <h3>Shipping Address</h3>
        <button className={classes.newAddressButton} onClick={newAddressHandler}>+ New Address</button>
        <p>Name: {name}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
        <p>Postal Code: {postalCode}</p>
      </div>
      <div className={classes.cartItems}>
        <h3>Cart Items</h3>
        {items.length > 0 ? (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>{item.amount} x ${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      </div>
      <button className={classes.orderButton} onClick={placeOrderHandler}>
        Place Order
      </button>
      {showAddressModal && <AddressForm onClose={addressFormCloseHandler} />}
    </div>
  );
};

export default SummaryPage;
