import React from 'react'
import { Outlet } from 'react-router-dom'


export default function OrderSummary() {
    return (
        <div>
            <div className='categoryContainer'>
                <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
                    <h1 className='m-2 mb-3'>Order Summary</h1>
                    <hr />
                    <div className="row justify-content-evenly">
                        <div className="col-2 orderproduct_image">
                            <img src={require('../../assets/images/User/tyre1.webp')} alt="" />
                        </div>
                        <div className="col-8">
                            <div>
                                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                                <div className="row d-flex">
                                    <div className='col-6 d-flex flex-column'>
                                        <div> <label className='order_label'>Unit Price</label><span>Rs.43526</span></div>
                                        <div><label className='order_label'>Quantity</label><span className='label_span'>5</span></div>
                                        <div> <label className='order_label'>Total Price</label><span>Rs. 20000</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* ----------------- */}

                    <div className="row justify-content-evenly">
                        <div className="col-2 orderproduct_image">
                            <img src={require('../../assets/images/User/doors.jpg')} alt="" />
                        </div>
                        <div className="col-8">
                            <div>
                                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                                <div className="row d-flex">
                                    <div className='col-6 d-flex flex-column'>
                                        <div> <label className='order_label'>Unit Price</label><span>Rs.43526</span></div>
                                        <div><label className='order_label'>Quantity</label><span className='label_span'>5</span></div>
                                        <div> <label className='order_label'>Total Price</label><span>Rs. 20000</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex row flex-row">
                        <div className="col-4 sub_total d-flex"><p>Sub Total</p><span>Rs.15000000</span>  </div>
                        <div className=" col-6 text-end"><button className='edit_address_btn'>Edit Address</button></div>
                    </div>



                    <div className="address_info">
                        <div> <label className='order_label'>Billing Address: </label><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, soluta.</span></div>
                        <div> <label className='order_label'>Shipping Address</label><span style={{ marginLeft: '1rem' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, explicabo.</span></div>
                        <div> <label className='order_label'>Contact No.</label><span style={{ marginLeft: '3rem' }}>03241893423</span></div>
                    </div>

                    <div >
                        <button className="btn complete_order_btn">Complete Order</button>
                    </div>

                </div>

            </div>
            <Outlet />
        </div>
    )
}
