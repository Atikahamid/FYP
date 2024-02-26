import React from 'react'
import '../../App.css';
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

export default function Navbar() {
  return (
    <div className='navbarOne'>
      <div className="first">
        <FaBars className='bars2' />
        <input type="text" className='search-box' placeholder='search...' />
        <button type='submit' className='search-icon'><IoMdSearch /> </button>
      </div>
      <div className="side">
        <FaShoppingCart className='cart' />
        <h3 className='name'>Atika Hamid </h3>

        <button type="button" className="btn  logout">Logout</button>
      </div>
    </div>
  )
}
