import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import AddressModal from '../Meals/AddressForm';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const { user } = useAuth(); // Get user from AuthContext
  const [showAddressModal, setShowAddressModal] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const navigate = useNavigate();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    if (user?.address) {
      navigate('/summary', { state: { ...user.address } });
      cartCtx.clearCart();  // Clear the cart after placing the order
    } else {
      setShowAddressModal(true);
    }
    props.onClose();
  };
  

  const cartItemClickHandler = (id) => {
    props.onClose();
    navigate(`/item/${id}`);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          onClick={() => cartItemClickHandler(item.id)} // Handle click to redirect to detail page
        />
      ))}
    </ul>
  );

  const addressModalClose = () => {
    setShowAddressModal(false);
    props.onClose();
  }

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
      {showAddressModal && <AddressModal onClose={addressModalClose} />}
    </Modal>
  );
};

export default Cart;
