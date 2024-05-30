import React from 'react'
import '../../Styles/App.css'
import { BiSolidCategory } from "react-icons/bi";
// import { FaBars } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { BsFillQuestionCircleFill } from "react-icons/bs";
import { LuClipboardCheck } from "react-icons/lu";
// import { IoMdToday } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
// import { RiDashboardFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
// import Navbar from './Navbar';

export default function SidebarA({ isOpen }) {
  // const [isOpen, setIsOpen] = useState(true);
  // const toggle = () => setIsOpen(!isOpen);
  const [children, setChildren] = useState(false);
  const showChildren = () => setChildren(!children);

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <RxDashboard />
    },
    {
      path: "/categorymanagement",
      name: "Category ",
      icon: <LuClipboardCheck />
    },
    {
      name: "Products ",
      icon: <BiSolidCategory />,
      iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      childrens: [
        {
          path: "/productsmanagement/currentproducts",
          name: "Current Products",
          icon: <BiSolidCategory />
        },
        {
          path: "/productsmanagement/soldproducts",
          name: "Sold Products",
          icon: <BiSolidCategory />
        }
      ]
    },
    {
      name: "Account ",
      icon: <BiSolidCategory />,
      iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      childrens: [
        {
          path: "/accountmanagement/userlist",
          name: "User List",
          icon: <BiSolidCategory />
        },
        {
          path: "/accountmanagement/vendorlist",
          name: "Vendor List",
          icon: <BiSolidCategory />
        }
      ]
    },
    {
      name: "Offers ",
      icon: <BiSolidCategory />,
      iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      childrens: [
        {
          path: "/offermanagement/pendingoffers",
          name: "Pending Offers",
          icon: <BiSolidCategory />
        },
        {
          path: "/offermanagement/acceptedoffers",
          name: "Accepted Offers",
          icon: <BiSolidCategory />
        },
        {
          path: "/offermanagement/rejectedoffers",
          name: "Rejected Offers",
          icon: <BiSolidCategory />
        }
      ]
    },
    {
      name: "Orders ",
      icon: <BiSolidCategory />,
      iconClosed: <RiArrowDownSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      iconOpened: <RiArrowUpSFill style={{ display: isOpen ? "block" : "none", "paddingTop": "5px", fontSize: "19px" }} />,
      childrens: [
        {
          path: "/ordermanagement/completedorders",
          name: "Completed Orders",
          icon: <BiSolidCategory />
        },
        {
          path: "/ordermanagement/pendingorders",
          name: "Pending Orders",
          icon: <BiSolidCategory />
        },
        {
          path: "/ordermanagement/cancelledorders",
          name: "Cancelled Orders",
          icon: <BiSolidCategory />
        }
      ]
    }
  ]
  return (

    <div style={{ width: isOpen ? "20%" : "5%" }} className="sidebar">
      <div className="top_section">
        <h2 style={{ display: isOpen ? "block" : "none" }} className="logo">Moto Parts</h2>
        <div style={{ marginLeft: isOpen ? "30px" : "0px" }} >
          <img src={require('../../assets/images/logo/logowhite.jpeg')} alt="Logo" />
        </div>
      </div>
      {
        menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} onClick={item.childrens && showChildren} className={!item.childrens ? "link" : "link_partscategory"} activClassName="active">
            <div className="main_menue ">
              <div className="col-2">
                <div style={{ fontSize: isOpen ? "17px" : "20px" }} className={!item.childrens ? "icon" : "parts_icon"} >{item.icon}</div>
              </div>
              <div className="col-8">
                <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className={!item.childrens ? "link_text" : "parts_icon"}>{item.name}</div>
              </div>
              <div className="col-1">
                <div >{item.childrens && children ? item.iconOpened : item.childrens ? item.iconClosed : null}</div>
              </div>
            </div>
            <div className="sub_menue">
              {children && item.childrens && item.childrens.length > 0 && item.childrens.map((childItem, childIndex) => (
                <NavLink to={childItem.path} key={childIndex} className="child_link "  >
                  <div className="row d-flex justify-content-evenly ">
                    <div className="col-1">
                      <div className={!item.childrens ? "icon" : "partsSub_icon"}>{childItem.icon}</div>
                    </div>
                    <div className='col-8'>
                      <div style={{ display: isOpen ? "block" : "none", "paddingTop": "5px" }} className="link_text">{childItem.name}</div>
                    </div>
                  </div>
                </NavLink>
              ))
              }
            </div>
          </NavLink>

        )
        )
      }

    </div>

  )
}
