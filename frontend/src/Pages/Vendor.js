import React, { useEffect, useState } from 'react'
// import Sidebar from '../Components/user/Sidebar'
import SidebarV from '../Components/vendor/SidebarV'
import Navbar from '../Components/vendor/Navbar'
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom'
import DashboardV from '../Components/vendor/DashboardV';
import MyProductsV from '../Components/vendor/MyProductsV';
import AddProductsV from '../Components/vendor/AddProductsV';
import OffersV from '../Components/vendor/OffersV';
import MyProfileV from '../Components/vendor/MyProfileV';
import SampleProfile from '../Components/vendor/SampleProfile';
// import UpdateMyPro file from '../Components/user/UpdateMyProfile';
import axios from 'axios'
import toast from 'react-hot-toast';
import UpdateMyProfileV from '../Components/vendor/UpdateMyProfileV';
import SampleProductV from '../Components/vendor/SampleProductV';
import ProductDeatil from '../Components/vendor/ProductDeatil';
import UpdateProduct from '../Components/vendor/UpdateProduct';

export default function Vendor() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenExists = !!localStorage.getItem('token');
        const role= localStorage.getItem('role');
        if (tokenExists && role ==='vendor') {
          return;
        } 
        const response = await axios.get('/verify');
        if (response.data.status) {

        } else {
          toast.error("You are not logged in");
          navigate('/login');
        }
      } catch (error) {
        console.error("Error:", error);

        // if (error.response && error.response.data) {
        //   const errorMessage = error.response.data;
        //   if (errorMessage.includes('There is no token attached to header')) {
        //     toast.error("There is no token attach to header plz login first")
        //     navigate('/login')
        //   } else {
        //     console.error("Error: ", errorMessage);
        //   }
        // } else {
        //   console.error("Error:", error);
        // }
      };
    }
    fetchData();
  }, [navigate]);

  //   .then(res =>{
  //     if(res.data.status){
  //       navigate('/user')
  //     }else{
  //       toast.error('you are not logged in ');
  //       navigate('/')
  //     }
  //   })

  const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='contained'>

      <SidebarV isOpen={isOpen}
        onclick={({ path }) => {
          navigate(path);
        }}
        Item={[
          {
            path: "/vendor/dashboard"
          },
          {
            path: "/vendor/myproducts"
          },
          {
            path: "/vendor/addproducts"
          },
          {
            path: "/vendor/offers"
          },
          {
            path: "/vendor/profile"
          }
        ]}>
      </SidebarV>

      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <Content className='content' />
      </div>

    </div>
  )
}
function Content() {
  return (
    <div>
      <Routes>
        <Route path="/vendor/" element={<DashboardV />} />
        <Route path="/vendor/dashboard" element={<DashboardV />} />
        <Route path="/vendor/dashboard" element={<DashboardV />} />
        <Route path="/vendor/myproducts" element={<SampleProductV />} >
            <Route index element={<MyProductsV />} />
            <Route path="product-detail/:id" element={<ProductDeatil />} />
            <Route path='update-product/:id' element={<UpdateProduct/>}/>
        </Route>
        <Route path="/vendor/addproducts" element={<AddProductsV />} />
        <Route path="/vendor/offers" element={<OffersV />} />
        <Route path="/vendor/profile" element={<SampleProfile />} >
            <Route index element={<MyProfileV />} />
            <Route path="update-profile" element={<UpdateMyProfileV />} />
          </Route>


      </Routes>
      <Outlet />
    </div>
  )
}

