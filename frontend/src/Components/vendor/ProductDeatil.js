import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
export default function ProductDeatil() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`/product/get-product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product data', error);
            }
        };

        fetchProductData();
    }, [id]);


    return (
        <div>
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
                                        <h5>{product.title}</h5>
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
                                                        <dt>Quantity Available</dt>
                                                        <dd>{product.quantity}</dd>
                                                    </div>
                                                </div>
                                                <dt>Description</dt>
                                                <dd>{product.description}</dd>

                                            </dl>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <Outlet />
        </div>
    )
}
