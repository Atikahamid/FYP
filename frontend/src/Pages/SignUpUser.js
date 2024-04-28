import React from 'react'
import { Link } from 'react-router-dom';

export default function SignUpUser() {
  return (
    <div className='row justify-content-center categoryContainer'>
      <div className="col-8 inner  mt-3 p-5  mt-3 pt-2">
        <h1>User Registeration</h1>
        <div className="row ms-3 d-flex flex-row ">
          <div className="col-6 ">
            <div className="col-10 form_div ">
              <label className='form_label'>Full Name </label>
              <input type="text" className='form_control' placeholder='name' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Gender</label>
              <input type="text" className='form_control' placeholder='gender' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Email</label> <input type="email" className='form_control' placeholder='email.com' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Password</label> <input type="password" className='form_control' placeholder='password' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Date of birth</label> <input type="date" className='form_control' placeholder='date of birth' />
            </div>
          </div>
          <div className="col-6 ">
            <div className="col-10 form_div">
              <label className='form_label'>Phone_no.</label> <input type="text" className='form_control' placeholder='837487284728' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Address</label> <input type="text" className='form_control' placeholder='address line' />
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Province</label>
              <select id="province" className='form_select'>
                <option value="0">Select a Province</option>
              </select>
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>District</label>
              <select className='form_select'>
                <option>select a District</option>
              </select>
            </div>
            <div className="col-10 form_div">
              <label className='form_label'>Postal Code</label>
              <input type="text" className='form_control' placeholder='postal code' />
            </div>
          </div>
        </div>
        <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
          <button className="updatebtn p-2">Sign Up</button>
          <p className='text-center pt-2'>Already has an account? <Link to="/login" className='text-black'>Login</Link> </p>
        </div>
      </div>
    </div>
  )
}
