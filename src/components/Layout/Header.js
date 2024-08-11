// src/components/Layout/Header.js
import React, { Fragment, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import MealsImage from '../../assets/meals.jpg'; // Ensure this path is correct for your image
import { useAuth } from '../../store/AuthContext';
import AddressForm from '../Meals/AddressForm';

const Header = (props) => {
  const location = useLocation();
  const authCtx = useAuth();
  const navigate = useNavigate();
  const redirectPath = encodeURIComponent(location.pathname);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const [showAddressForm, setShowAddressForm] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/');
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const openAddressFormHandler = () => {
    setShowAddressForm(true);
  };

  const closeAddressFormHandler = () => {
    setShowAddressForm(false);
  };

  console.log(showAddressForm)

  return (
    showAddressForm ? (
      <AddressForm user={authCtx.user} onClose={closeAddressFormHandler} />
    ) : (<Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Link to="/" className={classes.link}>
            <h1>PlayTime</h1>
          </Link>
        </div>
        <nav className={classes.nav}>
          <HeaderCartButton onClick={props.onShowCart} />
          {authCtx.user ? (
            <div className={classes.profile} onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <span className={classes.userName}>
                {authCtx.user.name}
              </span>
              {dropdownOpen && (
                <div className={classes.dropdown}>
                  <p style={{ color: 'black' }}>{authCtx.user.name}</p>c
                  <p style={{ color: 'black' }}>{authCtx.user.mobile}</p>
                  <p style={{ color: 'black' }}>{authCtx.user.email}</p>
                  {/* {authCtx.user.address && <p>{authCtx.user.address}</p>} */}
                  {/* <button onClick={openAddressFormHandler}>Address</button> */}
                  <button onClick={logoutHandler}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Fragment>
              <Link to={`/login?redirectPath=${redirectPath}`} className={classes.link}>Login</Link>
            </Fragment>
          )}
        </nav>
      </header>
      {location.pathname === '/' && (
        <div className={classes['main-image']}>
          <img src={MealsImage} alt="A table full of delicious food!" />
        </div>
      )}
    </Fragment>)
  );
};

export default Header;
