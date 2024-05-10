import React, {useState} from 'react'
// import Sidebar from '../Components/user/Sidebar'
import SidebarV from '../Components/vendor/SidebarV'
import Navbar from '../Components/vendor/Navbar'
import { Route, Routes, useNavigate, Outlet } from 'react-router-dom'
import DashboardV from '../Components/vendor/DashboardV';
import MyProductsV from '../Components/vendor/MyProductsV';
import AddProductsV from '../Components/vendor/AddProductsV';
import OffersV from '../Components/vendor/OffersV';
import MyProfileV from '../Components/vendor/MyProfileV';

export default function Vendor() {
  const [isOpen, setIsOpen] = useState(true);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate=useNavigate();
  return (
    <div className='contained'>
      
      <SidebarV isOpen={isOpen}
      onclick={({path})=>{
        navigate(path);
      }}
      Item={[
        {
            path:"/vendor/dashboard"
        },
        {
            path:"/vendor/myproducts"
        },
        {
            path:"/vendor/addproducts"
        },
        {
            path:"/vendor/offers"
        },
        {
            path:"/vendor/profile"
        }
      ]}>
        </SidebarV>

        <div className="main">
        <Navbar toggleSidebar={toggleSidebar}/>
        <Content className='content'/>
      </div>

    </div>
  )
}
function Content(){
    return(
    <div>
       <Routes>
       <Route path="/vendor/dashboard" element={<DashboardV/>} />
          <Route path="/vendor/dashboard" element={<DashboardV/>} />
          <Route path="/vendor/myproducts" element={<MyProductsV/>} />
          <Route path="/vendor/addproducts" element={<AddProductsV/>} />
          <Route path="/vendor/offers" element={<OffersV/>} />
          <Route path="/vendor/profile" element={<MyProfileV/>} />
         
  
  
        </Routes>
        <Outlet/>
    </div>
    )
  }
  
  