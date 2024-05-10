import React from 'react';
import './Styles/App.css'
// import SidebarV from './Components/vendor/SidebarV'
// import Navbar from './Components/vendor/Navbar'
// import { Route, Routes, useNavigate } from 'react-router-dom'


//vendor routes
import DashboardV from './Components/vendor/DashboardV';
import MyProductsV from './Components/vendor/MyProductsV';
import AddProductsV from './Components/vendor/AddProductsV';
import OffersV from './Components/vendor/OffersV';
import MyProfileV from './Components/vendor/MyProfileV';
//user routes

import MyOrders from './Components/user/MyOrders';
import OfferStatus from './Components/user/OfferStatus';
import AskMe from './Components/user/AskMe';
import ProductCardPanel from './Components/user/ProductCardPanel';
import ProductDetails from './Components/user/ProductDetails';
import MakeOffer from './Components/user/MakeOffer';
import AddToCart from './Components/user/AddToCart';
import Dashboard from './Components/user/Dashboard';
import UpdateMyProfile from './Components/user/UpdateMyProfile';
import MyProfile from './Components/user/MyProfile';
import UsedParts from './Components/user/UsedParts';
import UnusedParts from './Components/user/UnusedParts';


import { Route, Routes } from 'react-router-dom';
import User from './Pages/User';
import Vendor from './Pages/Vendor';
import Admin from './Pages/Admin';
import LoginPage from './Pages/LoginPage';
import axios from 'axios';
import SignUpUser from './Pages/SignUpUser';
import SignUpVendor from './Pages/SignUpVendor';
import { Toaster } from 'react-hot-toast'
import ForgetPassword from './Pages/ForgetPassword';
import SampleUnuseParts from './Components/user/SampleUnuseParts';
import SampleProductPanel from './Components/user/SampleProductPanel';
import SampleProductDetails from './Components/user/SampleProductDetails';


axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true;


function App() {

  return (
    <div>
      <Toaster position='bottom-right' toastOptions={{ duration: 4000 }} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registerUser" element={<SignUpUser />} />
        <Route path="/registerVendor" element={<SignUpVendor />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/user/*" element={<User />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="partscategory/usedparts" element={<UsedParts />} />
          <Route path="partscategory/unusedparts" element={<SampleUnuseParts />} >
            <Route index element={<UnusedParts />} />
            <Route path="productCardPanel" element={<SampleProductPanel />} >
              <Route index element={<ProductCardPanel />} />
              <Route path="ProductDetails" element={<SampleProductDetails />} >
                <Route index element={<ProductDetails />} />
                <Route path="makeOffer" element={<MakeOffer />} />
                <Route path="addtocart" element={<AddToCart />} />
              </Route>
              <Route path="makeOffer" element={<MakeOffer />} />
              <Route path="addtocart" element={<AddToCart />} />
            </Route>

          </Route>


          <Route path="addtocart" element={<AddToCart />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="offerstatus" element={<OfferStatus />} />
          <Route path="askme" element={<AskMe />} />
          <Route path="updateprofile" element={<UpdateMyProfile />} />

          {/* <Route path="/CategoryCardPanel" element={<CategoryCardPanel/>} /> */}

          {/* <Route path="/ProductCard" element={<ProductCard/>} /> */}





        </Route>
        <Route path="/vendor/*" element={<Vendor />} >
          <Route path="dashboard" element={<DashboardV />} />

          <Route path="myproducts" element={<MyProductsV />} />
          <Route path="addproducts" element={<AddProductsV />} />
          <Route path="offers" element={<OffersV />} />
          <Route path="profile" element={<MyProfileV />} />
        </Route>
        <Route path="/admin" element={<Admin />} />


      </Routes>
    </div>
  )
}


export default App;
