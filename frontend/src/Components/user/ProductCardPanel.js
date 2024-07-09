import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';

export default function ProductCardPanel() {
  const { id: subcategoryId } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/product/getProduct/${subcategoryId}`);
        const data = response.data;
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [subcategoryId]);

  const groupIntoRows = (items, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const productRows = groupIntoRows(product, 3);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {product.length === 0 ? (
        <div className="d-flex justify-content-center mt-5">
          <h3>No products available</h3>
        </div>
      ) : (
        <div className='container-fluid categoryContainer'>
          {productRows.map((row, rowIndex) => (
            <div className="row d-flex justify-content-start" style={{ marginLeft: '2rem' }} key={rowIndex}>
              {row.map((product) => (
                <div className="col-4" key={product._id}>
                  <ProductCard
                    id={product._id}
                    imgSource={product.images[0].url}
                    name={product.title}
                    model={product.makes_model_year}
                    price={product.price}
                    quantity={product.quantity}
                    subcategoryId={subcategoryId}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}
