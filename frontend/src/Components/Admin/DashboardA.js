import React, { useEffect, useState } from 'react';
import DashCard from '../user/DashCard';
import axios from 'axios';
import Footer from './Footer';

export default function DashboardA() {
  const [data, setData] = useState({
    totalCategories: 0,
    totalProducts: 0,
    soldProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('/get_category');
        const productsResponse = await axios.get('/product/getAll-products');
        const soldProductsResponse = await axios.get('/product/getAllSoldProducts');
        const usersResponse = await axios.get('/accountmanagement/userlist');

        setData({
          totalCategories: categoriesResponse.data.length,
          totalProducts: productsResponse.data.length,
          soldProducts: soldProductsResponse.data.length,
          totalUsers: usersResponse.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) {
    return <div class="d-flex justify-content-center">
      <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  return (
   <div>
     <div className='categoryContainer dashboard_container'>
      <div className="row d-flex inner_dashcard">
        <DashCard name='Total Category' num={data.totalCategories} imgsource={require('../../assets/images/Admin/total category.png')} />
        <DashCard name='Total Products' num={data.totalProducts} imgsource={require('../../assets/images/Admin/total products.png')} />
        <DashCard name='Sold Products' num={data.soldProducts} imgsource={require('../../assets/images/Admin/sold.png')} />
        <DashCard name='Total Users' num={data.totalUsers} imgsource={require('../../assets/images/Admin/users.png')} />
      </div>
    </div>
    <Footer/>
   </div>
  );
}
