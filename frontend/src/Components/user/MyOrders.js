import React from 'react'

export default function MyOrders() {
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
          <div className="row justify-content-evenly">
            <div className="col-2 orderproduct_image">
              <img src={require('../../assets/images/User/doors.jpg')} alt="" />
            </div>
            <div className="col-8">
              <div>
                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                <div className="row d-flex">
                  <div className='col-6 d-flex flex-column'>
                    <div> <label className='order_label'>Price</label><span>Rs.43526</span></div>
                    <div><label className='order_label'>Items</label><span>5</span></div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <div> <label className='order_label'>Delivered Date</label><span>13/4/2020</span></div>
                    <div><label className='order_label'>Status</label><span className='orderstatus_span'>Delivered</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row justify-content-evenly mt-3">
            <div className="col-2 orderproduct_image">
              <img src={require('../../assets/images/User/doors.jpg')} alt="" />
            </div>
            <div className="col-8">
              <div>
                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                <div className="row d-flex">
                  <div className='col-6 d-flex flex-column'>
                    <div> <label className='order_label'>Price</label><span>Rs.43526</span></div>
                    <div><label className='order_label'>Items</label><span>5</span></div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <div> <label className='order_label'>Delivered Date</label><span>13/4/2020</span></div>
                    <div><label className='order_label'>Status</label><span className='orderstatus_span'>Delivered</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order_category">
            <h1>Cancelled Orders</h1>
          </div>
          <div className="row justify-content-evenly">
            <div className="col-2 orderproduct_image">
              <img src={require('../../assets/images/User/headlights.jpg')} alt="" />
            </div>
            <div className="col-8">
              <div>
                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                <div className="row d-flex">
                  <div className='col-6 d-flex flex-column'>
                    <div> <label className='order_label'>Price</label><span>Rs.43526</span></div>
                    <div><label className='order_label'>Items</label><span>5</span></div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <div> <label className='order_label'>Delivered Date</label><span>13/4/2020</span></div>
                    <div><label className='order_label'>Status</label><span className='orderstatus_span'>Delivered</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order_category">
            <h1>Pending Orders</h1>
          </div>
          <div className="row justify-content-evenly">
            <div className="col-2 orderproduct_image">
              <img src={require('../../assets/images/User/h2.jpg')} alt="" />
            </div>
            <div className="col-8">
              <div>
                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                <div className="row d-flex">
                  <div className='col-6 d-flex flex-column'>
                    <div> <label className='order_label'>Price</label><span>Rs.43526</span></div>
                    <div><label className='order_label'>Items</label><span>5</span></div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <div><label className='order_label'>Status</label><span className='orderstatus_span'>pending</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
