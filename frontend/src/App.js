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
// import UsedParts from './Components/user/UsedParts';

//admin routes
import DashboardA from './Components/Admin/DashboardA';
import Category from './Components/Admin/Category';
import CurrentProducts from './Components/Admin/CurrentProducts';
import SoldProducts from './Components/Admin/SoldProducts';
import UserList from './Components/Admin/UserList';
import VendorList from './Components/Admin/VendorList';
import PendingOffers from './Components/Admin/PendingOffers';
import AcceptOffers from './Components/Admin/AcceptOffers';
import RejectOffers from './Components/Admin/RejectOffers';
import CompleteOrders from './Components/Admin/CompleteOrders';
import PendingOrders from './Components/Admin/PendingOrders';
import CancelOrders from './Components/Admin/CancelOrders';

//app routes
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
import ResetPassword from './Pages/ResetPassword';
import OrderSummary from './Components/user/OrderSummary';
import SampleAddtoCart from './Components/user/SampleAddtoCart';
import SampleProfile from './Components/vendor/SampleProfile';
import UpdateMyProfileV from './Components/vendor/UpdateMyProfileV';
import SampleUserList from './Components/Admin/SampleUserList';
import Profile from './Components/Admin/Profile';
import SampleVendorList from './Components/Admin/SampleVendorList';
import ProfileV from './Components/Admin/ProfileV';
import SampleCategory from './Components/Admin/SampleCategory';
import SubCategory from './Components/Admin/SubCategory';
import SampleProductV from './Components/vendor/SampleProductV';
import ProductDeatil from './Components/vendor/ProductDeatil';
import UpdateProduct from './Components/vendor/UpdateProduct';
import CategoryCardPanel from './Components/user/CategoryCardPanel';

// axios.defaults.baseURL = `${window.location.origin}`
if (process.env.NODE_ENV === 'production') {
  // Use the same domain as your backend in production
  axios.defaults.baseURL = ''; // This defaults to the same domain as your backend
} else {
  axios.defaults.baseURL = 'http://localhost:8000';
}

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
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        <Route path="/user/*" element={<User />} >
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="partscategory" element={<SampleUnuseParts />} >
            <Route index element={<CategoryCardPanel />} />
            <Route path=":id/productCardPanel" element={<SampleProductPanel />} >
              <Route index element={<ProductCardPanel />} />
              <Route path="ProductDetails/:id" element={<SampleProductDetails />} >
                <Route index element={<ProductDetails />} />
                <Route path="makeOffer/:id" element={<MakeOffer />} />
                <Route path="addtocart" element={<AddToCart />} />
              </Route>
              <Route path="makeOffer/:id" element={<MakeOffer />} />
              <Route path="addtocart" element={<AddToCart />} />
            </Route>

          </Route>



          <Route path="addtocart" element={<SampleAddtoCart />} >
            <Route index element={<AddToCart />} />
            <Route path="ordersummary" element={<OrderSummary />} />
          </Route>
          <Route path="myorders" element={<MyOrders />} />
          <Route path="myprofile" element={<SampleProfile />} >
            <Route index element={<MyProfile />} />
            <Route path="update-profile" element={<UpdateMyProfile />} />
          </Route>
          <Route path="offerstatus" element={<OfferStatus />} />
          <Route path="askme" element={<AskMe />} />
          <Route path="updateprofile" element={<UpdateMyProfile />} />

          {/* <Route path="/CategoryCardPanel" element={<CategoryCardPanel/>} /> */}

          {/* <Route path="/ProductCard" element={<ProductCard/>} /> */}





        </Route>
        <Route path="/vendor/*" element={<Vendor />} >
          <Route path="" element={<DashboardV />} />
          <Route path="dashboard" element={<DashboardV />} />
          <Route path="myproducts" element={<SampleProductV />} >
            <Route index element={<MyProductsV />} />
            <Route path="product-detail/:id" element={<ProductDeatil />} />
            <Route path='update-product/:id' element={<UpdateProduct/>}/>
        </Route>
          <Route path="addproducts" element={<AddProductsV />} />
          <Route path="offers" element={<OffersV />} />
          <Route path="profile" element={<SampleProfile />} >
            <Route index element={<MyProfileV />} />
            <Route path="update-profile" element={<UpdateMyProfileV />} />
          </Route>
        </Route>
        <Route path="/admin/*" element={<Admin />} >
          <Route path="" element={<DashboardA />} />
          <Route path="dashboard" element={<DashboardA />} />
          <Route path="categorymanagement" element={<SampleCategory />} >
            <Route index element={<Category />} />
            <Route path='subcategory/:id' element={<SubCategory />} />
          </Route>
          <Route path="productsmanagement/currentproducts" element={<CurrentProducts />} />
          <Route path="productsmanagement/soldproducts" element={<SoldProducts />} />
          <Route path="accountmanagement/userlist" element={<SampleUserList />} >
            <Route index element={<UserList />} />
            <Route path='profile/:id' element={<Profile/>}/>
          </Route>
          <Route path="accountmanagement/vendorlist" element={<SampleVendorList />} >
            <Route index element={<VendorList />} />
            <Route path='profile/:id' element={<ProfileV />} />
          </Route>
          <Route path="offermanagement/pendingoffers" element={<PendingOffers />} />
          <Route path="offermanagement/acceptedoffers" element={<AcceptOffers />} />
          <Route path="offermanagement/rejectedoffers" element={<RejectOffers />} />
          <Route path="ordermanagement/completedorders" element={<CompleteOrders />} />
          <Route path="ordermanagement/pendingorders" element={<PendingOrders />} />
          <Route path="ordermanagement/cancelledorders" element={<CancelOrders />} />
        </Route>


      </Routes>
    </div>
  )
}


export default App;
