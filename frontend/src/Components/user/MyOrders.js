import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/product/get-user-order', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function (status) {
            // Resolve only if the status code is less than 500
            return status < 500;
          }
        });

        if (response.data.success) {
          setOrders(response.data.getorderuid);
          console.log(response.data.getorderuid);
        } else {
          console.error(response.data.msg);
        }
      } catch (error) {
        console.error('Error fetching user orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderOrder = (order) => {
    return (
      <div key={order._id} className="order_Container">
        <div className="row justify-content-evenly">
          {order.items.map((item) => (
            <div key={item.product._id} className="col-2 orderproduct_image">
              <img src={item.product.images[0].url} alt={item.product.name} />
            </div>
          ))}
          <div className="col-8">
            <div>
              <p className='order_ptag'>{order.items.map((item) => item.product.title).join(', ')}</p>
              <div className="row d-flex">
                <div className='col-6 d-flex flex-column'>
                  <div> <label className='order_label'>Price:</label><span>Rs.{order.totalAmount}</span></div>
                  <div><label className='order_label'>Items:</label><span>{order.items.length}</span></div>
                </div>
                <div className="col-6 d-flex flex-column">
                  <div> <label className='order_label'>Status:</label><span className='orderstatus_span'>{order.status}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  };

  return (
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2">
        <h1>My Orders</h1>
      </div>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <div className="order_Container">
          <div className="order_category">
            <h1>Pending Orders</h1>
          </div>
          {orders.filter(order => order.status === 'Pending').map(renderOrder)}
          <div className="order_category">
            <h1>Completed Orders</h1>
          </div>
          {orders.filter(order => order.status === 'Delivered').map(renderOrder)}
          <div className="order_category">
            <h1>Cancelled Orders</h1>
          </div>
          {orders.filter(order => order.status === 'Cancelled').map(renderOrder)}

        </div>
      </div>
    </div>
  );
}
