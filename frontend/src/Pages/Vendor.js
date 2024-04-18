import React, {useState} from 'react'
// import Sidebar from '../Components/user/Sidebar'
import SidebarV from '../Components/vendor/SidebarV'
import Navbar from '../Components/vendor/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
            path:"/"
        },
        {
            path:"/myproducts"
        },
        {
            path:"/addproducts"
        },
        {
            path:"/offers"
        },
        {
            path:"/profile"
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
            <Route path="/" element={<DashboardV/>} />
  
          <Route path="/myproducts" element={<MyProductsV/>} />
          <Route path="/addproducts" element={<AddProductsV/>} />
          <Route path="/offers" element={<OffersV/>} />
          <Route path="/profile" element={<MyProfileV/>} />
         
  
  
        </Routes>
    </div>
    )
  }
  
  