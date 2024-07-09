import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import swal from 'sweetalert2';
import axios from 'axios';

export default function MakeOffer() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [offer, setOffer] = useState({
    offer_price: '',
    quantity: '',
});
const [errors, setErrors] = useState({});

useEffect(() => {
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/product/get-product/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product', error);
            setLoading(false);
        }
    };

    fetchProduct();
}, [id]);

const handleChange = (e) => {
    const { name, value } = e.target;
    setOffer({
        ...offer,
        [name]: value
    });
};

const validate = () => {
    const errors = {};

    if (!offer.offer_price) {
        errors.offer_price = 'Offer price is required';
    } else if (isNaN(offer.offer_price)) {
        errors.offer_price = 'Offer price must be a number';
    }

    if (!offer.quantity) {
        errors.quantity = 'Quantity is required';
    } else if (isNaN(offer.quantity)) {
        errors.quantity = 'Quantity must be a number';
    }


    setErrors(errors);
    return Object.keys(errors).length === 0;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
        return;
    }

    try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('/create_offer', {
            ...offer,
            vendor_id: product.vendor_id._id,
            product_id: id
        }, config);

        if (response.data.success) {
            swal.fire({
                title: 'Offer created successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: 'rgb(94, 37, 37)'
            });

        }
    } catch (error) {
        console.error('Error creating offer', error);
        swal.fire({
            title: "Failed to create Offer",
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: 'rgb(94, 37, 37)'
        });
    }
};

if (loading) {
    return <div class="d-flex justify-content-center">
        <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
}


    return (
        <div>
            <div className="categoryContainer">
                <div className="inner m-5 p-2 mt-3 pt-2 d-flex justify-content-evenly ">
                    <div className="col-6">
                        <div className="inner m-4 p-5 pt-2">
                            <h5>Make an Offer</h5>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <div className="col-12 form_div">
                                    <label className='form_label'>Enter Offer Price</label>
                                    <input type="text" className='form_control' name="offer_price" value={offer.offer_price} onChange={handleChange} />
                                    {errors.offer_price && <span className="error text-danger p-1">{errors.offer_price}</span>}
                                </div>
                                <div className="col-12 form_div">
                                    <label className='form_label'>Enter Quantity</label>
                                    <input type="number" className='form_control' name="quantity" value={offer.quantity} onChange={handleChange} />
                                    {errors.quantity && <span className="error text-danger p-1">{errors.quantity}</span>}
                                </div>
                                <div className="col-4 mt-3 makebtn">
                                    <button type='submit' className='updatebtn p-2'>Make Offer</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {product && (
                        <div className="col-6 mt-3 ms-4 me-2">
                            <h5>{product.title}</h5>
                            <div>
                                <hr style={{ width: "80%" }} />
                                <dl className="dl-horizontal">
                                    <dt>Price</dt>
                                    <dd>Rs. {product.price}</dd>
                                    <dt>Model</dt>
                                    <dd>{product.makes_model_year}</dd>
                                    <dt>Description</dt>
                                    <dd style={{ width: '80%' }}>{product.description}</dd>
                                </dl>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    );
}
