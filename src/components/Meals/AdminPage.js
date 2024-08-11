import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import classes from './AdminPage.module.css';

const AdminPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const orderList = querySnapshot.docs.map(doc => doc.data().orders).flat();
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={classes.adminPage}>
      <h2 className={classes.heading}>Admin: User Orders</h2>
      <table className={classes.ordersTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Product Details</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className={classes.orderRow}>
              <td>{order.user.name}</td>
              <td>{order.user.phone}</td>
              <td>{order.user.address}</td>
              <td>{order.user.postalCode}</td>
              <td>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx} className={classes.itemDetail}>
                      {item.name} - {item.amount} x ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
