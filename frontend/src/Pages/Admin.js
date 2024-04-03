import React from 'react'
import '../Styles/App.css';
// import SidebarA from '../Components/Admin/SidebarA'
import {  Route, Routes,useNavigate } from 'react-router-dom';
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



export default function Admin() {
  const navigate=useNavigate();
  return (
    <div className="contained">

      <SidebarDummy
        onclick={({ path }) => {
          navigate(path);
        }}
        Item={[
          {
            path: "/"
          },
          {
            path: "/categorymanagement"
          },
          {
            path: "/productsmanagement/currentproducts"
          },
          {
            path: "/productsmanagement/soldproducts"
          },
          {
            path: "/accountmanagement/userlist"
          },
          {
            path: "/accountmanagement/vendorlist"
          },
          {
            path: "/offermanagement/pendingoffers"
          },
          {
            path: "/offermanagement/acceptedoffers"
          },
          {
            path: "/offermanagement/rejectedoffers"
          },
          {
            path: "/ordermanagement/completedorders"
          },
          {
            path: "/ordermanagement/pendingorders"
          },
          {
            path: "/ordermanagement/cancelledorders"
          }
        ]}>
      </SidebarDummy>
      <div className="main">
        <NavbarA />
        <Content className='content' />
      </div>

     
</div>
  )
}

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardA />} />

        <Route path="/categorymanagement" element={<Category />} />
        <Route path="/productsmanagement/currentproducts" element={<CurrentProducts />} />
        <Route path="/productsmanagement/soldproducts" element={<SoldProducts />} />
        <Route path="/accountmanagement/userlist" element={<UserList />} />
        <Route path="/accountmanagement/vendorlist" element={<VendorList />} />
        <Route path="/offermanagement/pendingoffers" element={<PendingOffers />} />
        <Route path="/offermanagement/acceptedoffers" element={<AcceptOffers />} />
        <Route path="/offermanagement/rejectedoffers" element={<RejectOffers />} />
        <Route path="/ordermanagement/completedorders" element={<CompleteOrders />} />
        <Route path="/ordermanagement/pendingorders" element={<PendingOrders />} />
        <Route path="/ordermanagement/cancelledorders" element={<CancelOrders />} />
        

        
      </Routes>
    </div>
  )
}


