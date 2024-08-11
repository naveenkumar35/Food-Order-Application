import React from 'react';
import { useLocation } from 'react-router-dom';
import classes from './TrackingPage.module.css';

const TrackingPage = () => {
  const location = useLocation();
  const { date } = location.state || {};

  return (
    <div className={classes.trackingPage}>
      <h2>Order Tracking</h2>
      <div className={classes.trackingSteps}>
        <div className={`${classes.step} ${classes.completed}`}>
          <div className={classes.stepIcon}>✓</div>
          <div className={classes.stepLabel}>Order Placed</div>
          <div className={classes.stepDate}>{date}</div>
        </div>
        <div className={classes.step}>
          <div className={classes.stepIcon}>⌛</div>
          <div className={classes.stepLabel}>Dispatched</div>
        </div>
        <div className={classes.step}>
          <div className={classes.stepIcon}>🚚</div>
          <div className={classes.stepLabel}>Out for Delivery</div>
        </div>
        <div className={classes.step}>
          <div className={classes.stepIcon}>📦</div>
          <div className={classes.stepLabel}>Delivered</div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
