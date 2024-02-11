import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProductDetails() {
    const navigate = useNavigate();
    const handlemakeoffer = () => {
        navigate('/makeOffer');
    }
    return (
        <div>
            <div className="categoryContainer">
                <div className="inner m-5 p-2 mt-3 pt-2 ">
                    <div className="detaildata justify-content-evenly">
                        <div className="col-6 productdetail_img">
                            <img src={require('../../images/tyre1.webp')} alt="" />
                        </div>
                        <div className="col-6 productdetail_data">
                            <h5>Product Name</h5>
                            <div >
                                <hr />
                                <dl className="dl-horizontal ">
                                    <div className=" d-flex">
                                        <div className="col-6">
                                            <dt>Product Category</dt>
                                            <dd>tyres</dd>
                                            <dt>Price</dt>
                                            <dd>Rs.2345</dd>
                                            <dt>Seller Name</dt>
                                            <dd>abcd</dd>
                                        </div>
                                        <div className="col-6">
                                            <dt>Brand</dt>
                                            <dd>Honda</dd>
                                            <dt>Model</dt>
                                            <dd>Escape,civic</dd>
                                            <dt>Quantity Available</dt>
                                            <dd>5</dd>
                                        </div>
                                    </div>
                                    <dt>Description</dt>
                                    <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quasi odit quod qui nulla. Non eligendi at omnis quo rem?</dd>

                                </dl>
                            </div>
                            <div className="col-12 d-flex">
                                <button className="btn  ms-0 pdbtn">Add to Cart</button>
                                <button className="btn  pdbtn" onClick={handlemakeoffer}>Make an Offer</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
