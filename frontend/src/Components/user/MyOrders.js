import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = localStorage.getItem('id'); // Assuming userId is stored in local storage
            try {
                const response = await axios.get(`/product/get-user-order/${userId}`);
                if (response.data.success) {
                    const orders = response.data.getorderuid;
                    setCompletedOrders(orders.filter(order => order.status === 'Delivered'));
                    setCancelledOrders(orders.filter(order => order.status === 'Cancelled'));
                    setPendingOrders(orders.filter(order => order.status === 'Pending'));
                } else {
                    setError(response.data.msg);
                }
            } catch (error) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if(loading){
      return <div class="d-flex justify-content-center">
      <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderOrder = (order) => (
        <div key={order._id}>
            <div className="row justify-content-evenly">
                <div className="col-2 orderproduct_image">
                    <img src={order.items[0].product.images[0].url} alt="" />
                </div>
                <div className="col-8">
                    <div>
                        <p className='order_ptag'>{order.items[0].product.description}</p>
                        <div className="row d-flex">
                            <div className='col-6 d-flex flex-column'>
                                <div> <label className='order_label'>Price</label><span>Rs.{order.totalAmount}</span></div>
                                <div><label className='order_label'>Items</label><span>{order.items.length}</span></div>
                            </div>
                            <div className="col-6 d-flex flex-column">
                                {/* <div> <label className='order_label'>Delivered Date</label><span>{order.deliveryDate}</span></div> */}
                                <div><label className='order_label'>Status</label><span className='orderstatus_span'>{order.status}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );

    return (
        <div className='categoryContainer'>
            <div className="inner m-5 p-2 mt-3 pt-2">
                <h1>My Orders</h1>
            </div>
            <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
                <div className="order_Container">
                    <div className="order_category">
                        <h1>Completed Orders</h1>
                    </div>
                    {completedOrders.length > 0 ? completedOrders.map(renderOrder) : <p>No completed orders.</p>}
                    
                    <div className="order_category">
                        <h1>Cancelled Orders</h1>
                    </div>
                    {cancelledOrders.length > 0 ? cancelledOrders.map(renderOrder) : <p>No cancelled orders.</p>}
                    
                    <div className="order_category">
                        <h1>Pending Orders</h1>
                    </div>
                    {pendingOrders.length > 0 ? pendingOrders.map(renderOrder) : <p>No pending orders.</p>}
                </div>
            </div>
        </div>
    );
}
