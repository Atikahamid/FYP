import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyProfileV() {
  const navigate=useNavigate();
  const handleeditprofile=()=>{
    navigate('/updateprofile');
  }
  return (
    <div className='categoryContainer'>
            <div className="inner m-5 p-2 mt-3 pt-2">

                <h1>My Profile</h1>
            </div>
            <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
                <div className="row mt-3">
                    <div className="col-4">
                        <div className="profile_image">
                            <img src={require('../../assets/images/User/blank-profile.png')} alt="" />
                        </div>
                    </div>
                    <div className="col-8 ">
                        <div className='d-flex justify-content-between'>
                            <h2>Atika Hamid</h2>
                            <button className='Editprofile_btn' onClick={handleeditprofile} >Edit Profile</button>
                        </div>
                        <hr />
                        <div className="row d-flex myprofile_label">
                            <div className="col-6">
                                <label>User Name</label>
                            </div>
                            <div className="col-6">
                                <p>Atika Hamid</p>
                            </div>
                        </div>
                        <div className="row d-flex myprofile_label">
                            <div className="col-6">
                                <label>Email ID</label>
                            </div>
                            <div className="col-6">
                                <p>hafizaatikahamid965@gmail.com</p>
                            </div>
                        </div>
                        <div className="row d-flex myprofile_label">
                            <div className="col-6">
                                <label>Phone Number</label>
                            </div>
                            <div className="col-6">
                                <p>0324-4826836</p>
                            </div>
                        </div>
                        <div className="row d-flex myprofile_label">
                            <div className="col-6">
                                <label>Registered Date</label>
                            </div>
                            <div className="col-6">
                                <p>03/2/2024</p>
                            </div>
                        </div>
                        <div className="row d-flex myprofile_label">
                            <div className="col-6">
                                <label>Address</label>
                            </div>
                            <div className="col-6">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, cumque.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
  )
}
