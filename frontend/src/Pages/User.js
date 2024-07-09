import React, { useEffect, useState } from 'react'
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
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
// import UsedParts from '../Components/user/UsedParts';

import SampleUnuseParts from '../Components/user/SampleUnuseParts';
import SampleProductPanel from '../Components/user/SampleProductPanel';
import SampleProductDetails from '../Components/user/SampleProductDetails';
// import ProductCard from './Components/ProductCard';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import OrderSummary from '../Components/user/OrderSummary';
import SampleAddtoCart from '../Components/user/SampleAddtoCart';
import SampleProfile from '../Components/vendor/SampleProfile';
import CategoryCardPanel from '../Components/user/CategoryCardPanel';



export default function User() {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenExists = !!localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (tokenExists && role === 'customer') {
          return;
        }
        const response = await axios.get('/verify');
        if (response.data.status) {

        } else {
          toast.error('You are not logged in');
          navigate('/login');
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }
    fetchData();
  }, [navigate]);

  const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="contained">

      <Sidebar isOpen={isOpen}
        onclick={({ path }) => {
          navigate(path);
        }}
        Item={[
          {
            path: "/user/dashboard"
          },
          {
            path: "/user/myorders"
          },
          {
            path: "/user/partscategory"
          },
          
          {
            path: "/user/myprofile"
          },
          {
            path: "/user/offerstatus"
          },

        ]}>
      </Sidebar>

      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
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
// function Content() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />

//         <Route path="/partscategory/usedparts" element={<UsedParts />} />
//         <Route path="/partscategory/unusedparts" element={<UnusedParts />} />

//         <Route path="/myorders" element={<MyOrders />} />
//         <Route path="/myprofile" element={<MyProfile />} />
//         <Route path="/offerstatus" element={<OfferStatus />} />
//         <Route path="/askme" element={<AskMe />} />
//         <Route path="/updateprofile" element={<UpdateMyProfile />} />


//         {/* Other routes */}
//       </Routes>
//     </div>
//   )
// }

function Content() {
  return (
    <div>
      <Routes>
        <Route path="/user/dashboard" element={<Dashboard />} />

        <Route path="/user/partscategory" element={<SampleUnuseParts />} >
          <Route index element={<CategoryCardPanel />} />
          <Route path=":id/productCardPanel" element={<SampleProductPanel />} >
            <Route index element={<ProductCardPanel />} />
            <Route path="ProductDetails/:id" element={<SampleProductDetails />} >
              <Route index element={<ProductDetails />} />
              <Route path="makeOffer/:id" element={<MakeOffer />} />
            </Route>
            <Route path="makeOffer/:id" element={<MakeOffer />} />
          </Route>
        </Route>


        <Route path="/user/addtocart" element={<SampleAddtoCart />} >
          <Route index element={<AddToCart />} />
          <Route path="ordersummary" element={<OrderSummary />} />
        </Route>
        <Route path="/user/myorders" element={<MyOrders />} />
        <Route path="/user/myprofile" element={<SampleProfile />} >
            <Route index element={<MyProfile />} />
            <Route path="update-profile" element={<UpdateMyProfile />} />
          </Route>
        <Route path="/user/offerstatus" element={<OfferStatus />} />
        <Route path="/user/askme" element={<AskMe />} />
       
        {/* <Route path="/CategoryCardPanel" element={<CategoryCardPanel/>} /> */}
        {/* <Route path="/ProductCard" element={<ProductCard/>} /> */}


      </Routes>
      <Outlet />
    </div>
  )
}

