import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

 
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/product/get-product/${id}`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);

            }
        };
        fetchProduct();
    }, [id]);

    const handlemakeoffer = () => {
        navigate(`/user/partscategory/:id/productCardPanel/ProductDetails/${id}/makeOffer/${id}`);
    }
    const handleaddtocart = async () => {
        const token = localStorage.getItem('token');
        const quantity = 1;
        // console.log(id);
        try {
            const response = await axios.post('/add-to-cart', {
                productId: id,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                Swal.fire({
                    title: 'Product added to cart successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: 'rgb(94, 37, 37)'
                });
            } 
        } catch (error) {
            console.error('Error adding to cart', error);
            Swal.fire({
                title: error.response.data.message,
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: 'rgb(94, 37, 37)'
            });
        }
    }

    if (loading) {
        return <div class="d-flex justify-content-center">
            <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div>
            <div>
                <div className="categoryContainer">
                    {product && (
                        <div className="inner m-5 p-2 mt-3 pt-2 ">
                            <div className="detaildata justify-content-evenly">
                                <div className="col-6 productdetail_img">
                                    <div id="carouselExample" class="carousel slide">
                                        <div className="carousel-inner">
                                            {product.images.map((image, index) => (
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                    <img
                                                        src={image.url}
                                                        className="d-block w-100"
                                                        alt={`Product ${index + 1}`}
                                                        style={{
                                                            maxWidth: '80%',
                                                            maxHeight: '400px',
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <button class="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon bg-secondary" aria-hidden="true"></span>
                                            <span class="visually-hidden ">Previous</span>
                                        </button>
                                        <button class="carousel-control-next " type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <span class="carousel-control-next-icon bg-secondary" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-6 productdetail_data">
                                    <h3>{product.title}</h3>
                                    <div >
                                        <hr />
                                        <dl className="dl-horizontal ">
                                            <div className=" d-flex">
                                                <div className="col-6">
                                                    <dt>Product Category</dt>
                                                    <dd>{product.category_id.name}</dd>
                                                    <dt>Price</dt>
                                                    <dd>{product.price}</dd>
                                                    <dt>Seller Name</dt>
                                                    <dd>{product.vendor_id.fullName}</dd>
                                                </div>
                                                <div className="col-6">
                                                    <dt>Brand</dt>
                                                    <dd>{product.brand}</dd>
                                                    <dt>Model</dt>
                                                    <dd>{product.makes_model_year}</dd>


                                                </div>
                                            </div>
                                            <dt>Description</dt>
                                            <dd>{product.description}</dd>

                                        </dl>
                                    </div>
                                    <div className="col-12 d-flex">
                                        <button className="btn  ms-0 pdbtn" onClick={handleaddtocart}>Add to Cart</button>
                                        <button className="btn  pdbtn" onClick={handlemakeoffer}>Make an Offer</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <Outlet />
        </div>

    )
}
