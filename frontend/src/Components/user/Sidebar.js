import React from 'react';
import { BiSolidCategory} from "react-icons/bi";
import {FaBars} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { LuClipboardCheck } from "react-icons/lu";
import { IoMdToday } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// import { RiDashboardFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
// import Navbar from './Navbar';


export default function Sidebar() {
  const[isOpen, setIsOpen]=useState(true);
  const toggle=()=>setIsOpen(!isOpen);
  const menuItem=[
    {
      path:"/",
      name:"Dashboard",
      icon:<RxDashboard />
    },
    {
      path:"/partscategory",
      name:"Parts Category",
      icon:<BiSolidCategory/>
    },
    {
      path:"/myorders",
      name:"My Orders",
      icon:<LuClipboardCheck />
    },
    {
      path:"/myprofile",
      name:"MyProfile",
      icon:<CgProfile />
    },
    {
      path:"/offerstatus",
      name:"Offer Status",
      icon:<IoMdToday />
    },
    {
      path:"/askme",
      name:"Ask Me",
      icon:<BsFillQuestionCircleFill />
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
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div style={{fontSize: isOpen ? "17px": "20px"}}  className="icon">{item.icon}</div>
              <div style={{display: isOpen ? "block": "none", "paddingTop":"5px"}} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      
  )
}
