import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from server
    axios.get('/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='container' style={{color: "black"}}>
      <h1 className="display-4 mb-4">Orders</h1>
      <table className="table table-striped" style={{color: "black"}}>
        <thead>
          <tr>
            <th>User</th>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.user}</td>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>${order.price.toFixed(2)}</td>
              <td>
                <span className={`badge badge-${order.status === 'Shipped' ? 'success' : 'warning'}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
