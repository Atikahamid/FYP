import React from 'react'

export default function MakeOffer() {
    return (
        <div>
            <div className="categoryContainer">
                <div className="inner m-5 p-2 mt-3 pt-2 ">
                    <h1>Make Offer</h1>
                </div>
                <div className="inner m-5 p-2 mt-3 pt-2 d-flex justify-content-evenly ">
                    
                    <div className="col-6">
                        <div className="inner m-4 p-5  pt-2">
                            <h5>Make an Offer</h5>
                            <hr />
                            <form action="">
                                <div className="col-12 form_div">
                                    <label className='form_label'>Enter Offer Price</label>
                                    <input type="text" className='form_control' />
                                </div>
                                <div className="col-12 form_div">
                                    <label className='form_label'>Enter Description</label>
                                    <input type="text" className='form_control' />
                                </div>
                                <div className="col-4 mt-3 makebtn">
                                <button type='submit' className='updatebtn p-2'>Make Offer</button>
                                </div>

                                
                            </form>
                        </div>
                    </div>
                    <div className="col-6 mt-3 ms-4">
                        <h5>Product Name</h5>
                        <div>
                            <hr style={{width:"80%"}}/>
                            <dl className="dl-horizontal">
                                <dt>Price</dt>
                                <dd>Rs.22334</dd>
                                <dt>Model</dt>
                                <dd>Civic</dd>
                                <dt>Brand</dt>
                                <dd>Honda</dd>
                                <dt>Description</dt>
                                <dd>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, asperiores?</dd>
                            </dl>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
