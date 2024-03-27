import React from 'react'
import '../../Styles/App.css'
import { IoColorFilterSharp } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { CgPlayListAdd } from "react-icons/cg";
import { IoMdToday } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {FaBars} from "react-icons/fa";

export default function SidebarV() {
    const[isOpen, setIsOpen]=useState(true);
  const toggle=()=>setIsOpen(!isOpen);
  const menuItem=[
    {
      path:"/",
      name:"Dashboard",
      icon:<RxDashboard />
    },
    {
      path:"/myproducts",
      name:"My Products",
      icon:<IoColorFilterSharp />
    },
    {
      path:"/addproducts",
      name:"Add Product",
      icon:<CgPlayListAdd />
    },
    {
      path:"/offers",
      name:"Offers",
      icon:<IoMdToday />
    },
    {
      path:"/profile",
      name:"My Profile",
      icon:<CgProfile />
    }
  ]
  return (
    <div style={{width: isOpen ?"20%": "5%"}} className="sidebar">
    <div className="top_section">
      <h2 style={{display: isOpen ? "block": "none"}} className="logo">Moto Parts</h2>
      <div style={{marginLeft: isOpen ? "30px": "0px"}} className="bars">
        <FaBars onClick={toggle}/>
      </div>
    </div>
    {
      menuItem.map((item,index)=>(
        <NavLink to={item.path} key={index} className="link_vendor" activeClassName="active">
          <div style={{fontSize: isOpen ? "17px": "20px"}}  className="icon">{item.icon}</div>
          <div style={{display: isOpen ? "block": "none", "paddingTop":"5px"}} className="link_text">{item.name}</div>
        </NavLink>
      ))
    }
  </div>
  
  )
}
