import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../Styles/App.css';
// import PartsCategory from '../Components/user/PartsCategory';
import MyOrders from '../Components/user/MyOrders';
// import MyProfile from '../Components/user/UpdateMyProfile';
import OfferStatus from '../Components/user/OfferStatus';
import AskMe from '../Components/user/AskMe';
// import CategoryCard from './Components/CategoryCard';
import Navbar from '../Components/user/Navbar';
import Sidebar from '../Components/user/Sidebar';
// import CategoryCardPanel from './Components/CategoryCardPanel';
import ProductCardPanel from '../Components/user/ProductCardPanel';
import ProductDetails from '../Components/user/ProductDetails';
import MakeOffer from '../Components/user/MakeOffer';
import AddToCart from '../Components/user/AddToCart';
import Dashboard from '../Components/user/Dashboard';
import UpdateMyProfile from '../Components/user/UpdateMyProfile';
import MyProfile from '../Components/user/MyProfile';
import UsedParts from '../Components/user/UsedParts';
import UnusedParts from '../Components/user/UnusedParts';
// import ProductCard from './Components/ProductCard';

export default function User() {
  const navigate = useNavigate();
  return (
    <div className="contained">

      <Sidebar
        onclick={({ path }) => {
          navigate(path);
        }}
        Item={[
          {
            path: "/"
          },
          {
            path: "/myorders"
          },
          {
            path: "/partscategory/usedparts"
          },
          {
            path: "/partscategory/unusedparts"
          },
          {
            path: "/myprofile"
          },
          {
            path: "/offerstatus"
          },
          {
            path: "/askme"
          }

        ]}>
      </Sidebar>

      <div className="main">
        <Navbar />
        <Content className='content' />
      </div>

      {/* <Navbar/> */}
      {/* <div className="navbarA"><Navbar/>
       */}
      {/* </div> */}
      {/* <CategoryCard/> */}

    </div>

  )
}
function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/partscategory/usedparts" element={<UsedParts />} />
        <Route path="/partscategory/unusedparts" element={<UnusedParts />} />

        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/offerstatus" element={<OfferStatus />} />
        <Route path="/askme" element={<AskMe />} />
        <Route path="/updateprofile" element={<UpdateMyProfile />} />

        {/* <Route path="/CategoryCardPanel" element={<CategoryCardPanel/>} /> */}
        <Route path="/ProductCardPanel" element={<ProductCardPanel />} />
        {/* <Route path="/ProductCard" element={<ProductCard/>} /> */}
        <Route path="/ProductDetails" element={<ProductDetails />} />
        <Route path="/makeOffer" element={<MakeOffer />} />
        <Route path="/addtocart" element={<AddToCart />} />


      </Routes>
    </div>
  )
}

