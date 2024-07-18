import React,{useEffect, useState} from 'react'
import DashCard from '../user/DashCard'
import axios from 'axios'
import Footer from '../Admin/Footer';
export default function DashboardV() {
  const [data, setData] = useState({
    totalProducts: 0,
    pendingOffers:0,
    soldProducts: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get('/getOffer-Vendor');
        const productsResponse = await axios.get('/product/get-product-vendor');
        const soldProductsResponse = await axios.get('/product/get-soldProduct-vendor');
        const totalRevenueResponse = await axios.get('/product/revenue-calculation');


        setData({
          pendingOffers: pendingResponse.data.length,
          totalProducts: productsResponse.data.length,
          soldProducts: soldProductsResponse.data.length,
          totalRevenue: totalRevenueResponse.data.totalAmount
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
     <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Total Products' num={data.totalProducts} imgsource={require('../../assets/images/Vendor/products.webp')}/>
     <DashCard name='Pending Offers' num={data.pendingOffers}  imgsource={require('../../assets/images/Vendor/time-managament.png')}/>
     <DashCard  name='Sold Products' num={data.soldProducts}  imgsource={require('../../assets/images/Vendor/sold.png')}/>
     <DashCard name='Total Revenue'  num={<><span className='currency'>Rs.</span> <span className='totalRevenue'>{data.totalRevenue}</span></>} imgsource={require('../../assets/images/Vendor/revenue.png')}/>
    </div>
    <Footer/>
   </div>
  )
}
