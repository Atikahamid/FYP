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
import axios from 'axios'
import toast from 'react-hot-toast';

export default function Vendor() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenExists = !!localStorage.getItem('token');
        if(tokenExists){
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
        <Route path="/vendor/dashboard" element={<DashboardV />} />
        <Route path="/vendor/dashboard" element={<DashboardV />} />
        <Route path="/vendor/myproducts" element={<MyProductsV />} />
        <Route path="/vendor/addproducts" element={<AddProductsV />} />
        <Route path="/vendor/offers" element={<OffersV />} />
        <Route path="/vendor/profile" element={<MyProfileV />} />



      </Routes>
      <Outlet />
    </div>
  )
}

