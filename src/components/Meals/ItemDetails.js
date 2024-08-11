import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MealsData from './MealsData';
import classes from './ItemDetails.module.css';
import CartContext from '../../store/cart-context';
import AddressForm from './AddressForm';
import { useAuth } from '../../store/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ItemDetails = (props) => {
    const { user } = useAuth(); // Destructure user from useAuth
    const [currentImage, setCurrentImage] = useState(0);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const { id } = useParams();
    const item = MealsData.find(meal => meal.id === id);
    const navigate = useNavigate(); // Initialize useNavigate

    const cartCtx = React.useContext(CartContext);

    if (!item) return <p>Item not found</p>;

    const changeImageHandler = (index) => {
        setCurrentImage(index);
    };

    const addToCartHandler = () => {
        cartCtx.addItem({
            id: item.id,
            name: item.name,
            amount: 1,
            price: item.price,
        });
    };

    const buyNowHandler = () => {
        const selectedItem = {
            id: item.id,
            name: item.name,
            amount: 1,
            price: item.price,
        };

        props.onCloseCart();
        if (user?.address) {
            navigate('/summary', { state: { ...user.address, items: [selectedItem], totalAmount: item.price } });
        } else {
            setShowAddressModal(true);
        }
    };


    return (
        <div className={classes.container}>
            <div className={classes.images}>
                <img src={item.images[currentImage]} alt={item.name} className={classes.mainImage} />
                <div className={classes.thumbnailContainer}>
                    {item.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`${item.name} thumbnail ${index}`}
                            onClick={() => changeImageHandler(index)}
                            className={`${classes.thumbnail} ${currentImage === index ? classes.activeThumbnail : ''}`}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.details}>
                <h2>{item.name}</h2>
                <p className={classes.shortDescription}>{item.description}</p>
                <p className={classes.price}>${item.price.toFixed(2)}</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ paddingBottom: '15px' }}>
                        <button className={classes.addButton} onClick={addToCartHandler}>Add to Cart</button>
                    </div>
                    <div style={{ paddingBottom: '15px' }}>
                        <button className={`${classes.addButton} ${classes.buyButton}`} onClick={buyNowHandler}>Buy Now</button>
                    </div>
                </div>
            </div>
            {showAddressModal && <AddressForm onClose={() => setShowAddressModal(false)} />}
        </div>
    );
};

export default ItemDetails;
