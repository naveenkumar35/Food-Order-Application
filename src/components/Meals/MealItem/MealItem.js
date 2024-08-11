import { Link } from 'react-router-dom';
import React from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context'; // Import your CartContext


const MealItem = (props) => {
  const price = props.price.toFixed(2);
  const cartCtx = React.useContext(CartContext); // Use CartContext

  const addToCartHandler = () => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <Link to={`/item/${props.id}`} className={classes.link}>
        <div className={classes.imageContainer}>
          <img src={props.image} alt={props.name} className={classes.image} />
        </div>
        <div className={classes.details}>
          <h3 className={classes.name}>{props.name}</h3>
          <p className={classes.description}>{props.shortDescription}</p>
          <p className={classes.price}>₹{price}</p>
        </div>
      </Link>
      <div className={classes.formContainer}>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
