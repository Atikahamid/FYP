import React from 'react';
import { BiSolidCategory } from "react-icons/bi";
// import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
// import { BsFillQuestionCircleFill } from "react-icons/bs";
import { LuClipboardCheck } from "react-icons/lu";
import { IoMdToday } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
// import { RiDashboardFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
// import Navbar from './Navbar';


export default function Sidebar({isOpen}) {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggle = () => setIsOpen(!isOpen);
  const [openMenus, setOpenMenus] = useState({});

  // const [children, setChildren] = useState(false);
  // const showChildren = () => setChildren(!children);

  const toggleMenu = (menuName) => {
    setOpenMenus(prevState => ({
        ...prevState,
        [menuName]: !prevState[menuName]
    }));
};

  const menuItem = [
    {
      path: "/user/dashboard",
      name: "Dashboard",
      icon: <RxDashboard />
    },
    {
      path: "/user/partscategory",
      name: "Parts Category",
      icon: <BiSolidCategory />
    },
    {
      path: "/user/myorders",
      name: "My Orders",
      icon: <LuClipboardCheck />
    },
    {
      path: "/user/myprofile",
      name: "MyProfile",
      icon: <CgProfile />
    },
    {
      path: "/user/offerstatus",
      name: "Offer Status",
      icon: <IoMdToday />
    },
   
  ]
  return (

    <div style={{ width: isOpen ? "20%" : "5%" }} className="sidebar">
      <div className="top_section">
      <div style={{ marginLeft: isOpen ? "-10px" : "-10px" }} className="bars">
          <img src={require('../../assets/images/logo/hexalogo.jpg')} style={{width:'50px', height:'50px'}} alt="" /> 
        </div>
        <h2 style={{ display: isOpen ? "block" : "none" }} className="logo">Moto Parts</h2>
       
      </div>
      <div className="inner_sidebar mb-5">
                <div className="inside_sidebar">
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className={!item.childrens ? "link" : "link_partscategory"} activeClassname='active'>
                            <div className="main_menue" onClick={() => toggleMenu(item.name.toLowerCase())}>
                                <div className="col-2">
                                    <div style={{ fontSize: isOpen ? "17px" : "20px" }} className={!item.childrens ? "icon" : "parts_icon"}>{item.icon}</div>
                                </div>
                                <div className="col-8">
                                    <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className={!item.childrens ? "link_text" : "parts_icon"}>{item.name}</div>
                                </div>
                                <div className="col-1">
                                    {item.childrens && (openMenus[item.name.toLowerCase()] ? <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} /> : <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />)}
                                </div>
                            </div>
                            {item.childrens && openMenus[item.name.toLowerCase()] && (
                                <div className="sub_menue">
                                    {item.childrens.map((childItem, childIndex) => (
                                        <NavLink to={childItem.path} key={childIndex} className="child_link">
                                            < div className="row d-flex justify-content-evenly ">
                                                <div className="col-1">
                                                    <div className={!item.childrens ? "icon" : "partsSub_icon"}>{childItem.icon}</div>
                                                </div>
                                                <div className="col-8">
                                                    <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className="link_text">{childItem.name}</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </NavLink>
                    ))
                    }
                </div>
            </div>
    </div>

  )
}
