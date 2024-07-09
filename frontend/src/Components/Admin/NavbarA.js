import React, { useEffect, useState } from 'react'
import '../../Styles/App.css'
import { FaBars } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function NavbarA({toggleSidebar}) {
  const navigate= useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fullName = localStorage.getItem('fullName');
    if (fullName) {
      setUserName(fullName);
    }
  }, []);

    const handleLogout = async () => {
      try {
        const response = await axios.get('/logout');
        if (response) {
          navigate('/login');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('fullName');
          localStorage.removeItem('id');
        } else {
         console.log(response.data.error)
        }
      } catch (error) {
          console.error("Error:", error);

        // if (error.response && error.response.data) {
        //   const errorMessage = error.response.data;
        //   if (errorMessage.includes('There is no token attached to header')) {
        //     toast.error("There is no token attach to header plz login first")
        //     navigate('/login')
        //   } else {
        //     console.error("Error: ", errorMessage);
        //   }
        // } else {
        //   console.error("Error:", error);
        // }
      };
    }
  return (
    <div className='topbar'>
      <div className="first">
        <FaBars className='bars2' onClick={toggleSidebar} />
        <div className="row">
          <div className="col-8">
            <input type="text" className='search-box' placeholder='search...' />
          </div>
          <div className="col-2">
            <button type='submit' className='search-icon'><IoMdSearch /> </button>
          </div>
        </div>
      </div>
      <div className="side">
        <h3 className='name'>{userName}</h3>
        <button type="button" className="btn logoutbtn" onClick={handleLogout}>Logout</button>
      </div>
    </div>

  )
}
