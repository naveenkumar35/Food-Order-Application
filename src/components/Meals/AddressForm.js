// src/components/Meals/AddressForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext'; // Import useAuth
import classes from './AddressForm.module.css';
import Modal from '../UI/Modal';

const AddressForm = (props) => {
  const { user, saveAddress } = useAuth(); // Destructure saveAddress from useAuth
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    postalCode: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.address) {
      setFormData(user.address);
    }
  }, [user]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const confirmHandler = () => {
    saveAddress(formData); // Save the address to Firebase
    props.onClose();
    navigate('/summary', { state: { ...formData } });
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.addressModal}>
        <h2>Enter Your Address</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={inputChangeHandler}
          placeholder="Name"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={inputChangeHandler}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={inputChangeHandler}
          placeholder="Address"
        />
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={inputChangeHandler}
          placeholder="Postal Code"
        />
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.button} onClick={confirmHandler}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddressForm;
