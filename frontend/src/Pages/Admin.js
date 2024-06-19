import React, { useEffect, useState } from 'react'
import '../Styles/App.css';
// import SidebarA from '../Components/Admin/SidebarA'
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import DashboardA from '../Components/Admin/DashboardA';
import Category from '../Components/Admin/Category';
import CurrentProducts from '../Components/Admin/CurrentProducts';
import SoldProducts from '../Components/Admin/SoldProducts';
import UserList from '../Components/Admin/UserList';
import VendorList from '../Components/Admin/VendorList';
import PendingOffers from '../Components/Admin/PendingOffers';
import AcceptOffers from '../Components/Admin/AcceptOffers';
import RejectOffers from '../Components/Admin/RejectOffers';
import CompleteOrders from '../Components/Admin/CompleteOrders';
import PendingOrders from '../Components/Admin/PendingOrders';
import CancelOrders from '../Components/Admin/CancelOrders';
import NavbarA from '../Components/Admin/NavbarA';
import SidebarDummy from '../Components/Admin/SidebarDummy';
import axios from 'axios'
import toast from 'react-hot-toast';
import SampleUserList from '../Components/Admin/SampleUserList';
import Profile from '../Components/Admin/Profile';
import SampleVendorList from '../Components/Admin/SampleVendorList';
import ProfileV from '../Components/Admin/ProfileV';
import SampleCategory from '../Components/Admin/SampleCategory';
import SubCategory from '../Components/Admin/SubCategory';



export default function Admin() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenExists = !!localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (tokenExists && role === 'admin') {
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




  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const [isOpen,setIsOpen]=useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="contained">

      <SidebarDummy isSidebarOpen={isSidebarOpen}
        onclick={({ path }) => {
          navigate(path);
        }}
        Item={[
          {
            path: "/admin/dashboard"
          },
          {
            path: "/admin/categorymanagement"
          },
          {
            path: "/admin/productsmanagement/currentproducts"
          },
          {
            path: "/admin/productsmanagement/soldproducts"
          },
          {
            path: "/admin/accountmanagement/userlist"
          },
          {
            path: "/admin/accountmanagement/vendorlist"
          },
          {
            path: "/admin/offermanagement/pendingoffers"
          },
          {
            path: "/admin/offermanagement/acceptedoffers"
          },
          {
            path: "/admin/offermanagement/rejectedoffers"
          },
          {
            path: "/admin/ordermanagement/completedorders"
          },
          {
            path: "/admin/ordermanagement/pendingorders"
          },
          {
            path: "/admin/ordermanagement/cancelledorders"
          }
        ]}>
      </SidebarDummy>
      <div className="main">
        <NavbarA toggleSidebar={toggleSidebar} />
        <Content className='content' />
      </div>


    </div>
  )
}

function Content() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/admin/dashboard" element={<DashboardA />} />

          <Route path="/admin/categorymanagement" element={<SampleCategory />} >
            <Route index element={<Category />} />
            <Route path='subcategory/:id' element={<SubCategory />} />
          </Route>
          <Route path="/admin/productsmanagement/currentproducts" element={<CurrentProducts />} />
          <Route path="/admin/productsmanagement/soldproducts" element={<SoldProducts />} />
          <Route path="/admin/accountmanagement/userlist" element={<SampleUserList />} >
            <Route index element={<UserList />} />
            <Route path='profile/:id' element={<Profile />} />
          </Route>
          <Route path="/admin/accountmanagement/vendorlist" element={<SampleVendorList />} >
            <Route index element={<VendorList />} />
            <Route path='profile/:id' element={<ProfileV />} />
          </Route>
          <Route path="/admin/offermanagement/pendingoffers" element={<PendingOffers />} />
          <Route path="/admin/offermanagement/acceptedoffers" element={<AcceptOffers />} />
          <Route path="/admin/offermanagement/rejectedoffers" element={<RejectOffers />} />
          <Route path="/admin/ordermanagement/completedorders" element={<CompleteOrders />} />
          <Route path="/admin/ordermanagement/pendingorders" element={<PendingOrders />} />
          <Route path="/admin/ordermanagement/cancelledorders" element={<CancelOrders />} />
        </Routes>
      </div>
      <Outlet />
    </div>

  )
}


