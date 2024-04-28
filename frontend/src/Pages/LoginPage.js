import React, { useState } from 'react'
import axios from 'axios'
import '../Styles/App.css'
import { Link, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate=useNavigate();

  const handleOnclick = async () => {
    const { value: userType } = await Swal.fire({
      title: 'You want to sign up as ?',
      input: 'radio',
      inputOptions: {
        vendor: 'Vendor',
        customer: 'Customer',
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You must choose one option';
        }
      },
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'OK',
      confirmButtonColor:'rgb(94, 37, 37)'
    });

    if (userType) {
      // Redirect to appropriate signup page based on user selection
      if (userType === 'vendor') {
        navigate('/signup/vendor');
      } else if (userType === 'customer') {
        navigate('/signup/user');
      }
    }
  };
  // const [data, setData] = useState({
  //   email: '',
  //   password: ''
  // })
  // const loginUser = (e)=>{
  //   e.preventDefault()
  //   axios.get('/')
  // }

  return (
    <div className='row justify-content-center categoryContainer_login '>
      <div className="col-4 inner  mt-3 p-5  mt-3 pt-2">
        <h1 className='pb-4'>Login</h1>
        <div className="row login_box ms-3  ">
          <form action="">
            <div className="user_box">
              <input type="email" name required/>
              <label>Email</label>
            </div>
            <div className="user_box">
              <input type="password" name required/>
              <label>Password</label>
            </div>
            <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
              <button className="updatebtn p-2">Login</button>
              <p className='text-center pt-2'>Don't have  an account? <Link className='text-black' onClick={handleOnclick}>Sign Up</Link> </p>
            </div>
          </form>

        </div>

      </div>
    </div>
  )
}
