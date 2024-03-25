import React from 'react'

export default function UpdateMyProfile() {
  return (
    <div className='categoryContainer'>
     <div className="inner m-5 p-2 mt-3 pt-2">

      <h1>Update Profile</h1>
      </div>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <div className="row profilerow">
        <div className="col-6 form_div ">
          <label className='form_label'>First Name </label>
           <input type="text" className='form_control' placeholder='name'/>
        </div>
        <div className="col-6 form_div">
          <label className='form_label'>Last Name</label> <input type="text" className='form_control' placeholder='end' />
        </div>
        <div className="col-12 form_div">
          <label className='form_label'>Gender</label>
           <input type="text" className='form_control' placeholder='gender' />
        </div>
        <div className="col-12 form_div">
          <label className='form_label'>Email</label> <input type="email" className='form_control' placeholder='email.com' />
        </div>
        <div className="col-12 form_div">
         
        <label className='form_label'>Password</label> 
        <div className="pass1">
        <input type="password" className='form_control col-11' placeholder='password' />
        <span className='input-group-text bg-primary'>
          <i className='bi bi-eye-slash-fill text-white col-2 eye'></i>
        </span>
        </div>
        </div>
        <div className="col-12 form_div">
        <label className='form_label'>Date of birth</label> <input type="date" className='form_control' placeholder='date of birth' />
        </div>
        <div className="col-12 form_div">
        <label className='form_label'>Phone_no.</label> <input type="text" className='form_control' placeholder='837487284728' />
        </div>
        <div className="col-12 form_div">
        <label className='form_label'>Registered Date</label> <input type="text" className='form_control' placeholder='registered date' />
        </div>
        <div className="col-12 form_div">
        <label className='form_label'>Address</label> <input type="text" className='form_control' placeholder='address line' />
        </div>
        <div className="col-6 form_div">
        <label className='form_label'>Province</label> 
        <select  id="province" className='form_select'>
          <option value="0">Select a Province</option>
        </select>
        </div>
        <div className="col-6 form_div">
          <label className='form_label'>District</label>
          <select className='form_select'>
            <option>select a District</option>
          </select>
        </div>
        <div className="col-12 form_div">
          <label className='form_label'>Postal Code</label>
          <input type="text"  className='form_control' placeholder='postal code'/>
        </div>
        <div className="col-12 mt-3 p-3">
          <button className="updatebtn p-2">Update My Profile</button>
        </div>
      </div>
     </div>
    </div>
  )
}
