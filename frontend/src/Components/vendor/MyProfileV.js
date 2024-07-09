import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function MyProfileV() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState(null);
    const [formatdate, setFormatdate] = useState(null);
    const [loading, setLoading]= useState(true);

    //fetch data
    const fetchData = async () => {
        try {
            const response = await axios.get('/get-vendor');
            const formattedDate = new Date(response.data.getaVendor.regestrationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            // Set formatted registration date back to the user data
            response.data.getaVendor.regestrationDate = formattedDate;
            setFormatdate(formattedDate);
            setUserData(response.data.getaVendor);
            setAddress(response.data.address);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching use data', error);
            setLoading(false);
        }
    };
    //useEffect function
    useEffect(() => {
        fetchData();

    }, []);
    const handleeditprofile = () => {
        navigate('/vendor/profile/update-profile');
    }

    if(loading){
        return <div class="d-flex justify-content-center">
        <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    }
    return (
        <div>
  <div className='categoryContainer'>
            <div className="inner m-5 p-2 mt-3 pt-2">

                <h1>My Profile</h1>
            </div>
            {userData && formatdate && address && (
                <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
                    <div className="row mt-3">
                        <div className="col-4">
                            <div className="profile_image">
                                <img src={require('../../assets/images/User/blank-profile.png')} alt="" />
                            </div>
                        </div>
                        <div className="col-8 ">
                            <div className='d-flex justify-content-between'>
                                <h2>{userData.fullName}</h2>
                                <button className='Editprofile_btn' onClick={handleeditprofile} >Edit Profile</button>
                            </div>
                            <hr />
                            <div className="row d-flex myprofile_label">
                                <div className="col-6">
                                    <label>User Name</label>
                                </div>
                                <div className="col-6">
                                    <p>{userData.fullName}</p>
                                </div>
                            </div>
                            <div className="row d-flex myprofile_label">
                                <div className="col-6">
                                    <label>Email ID</label>
                                </div>
                                <div className="col-6">
                                    <p>{userData.email}</p>
                                </div>
                            </div>
                            <div className="row d-flex myprofile_label">
                                <div className="col-6">
                                    <label>Phone Number</label>
                                </div>
                                <div className="col-6">
                                    <p>{userData.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="row d-flex myprofile_label">
                                <div className="col-6">
                                    <label>Registered Date</label>
                                </div>
                                <div className="col-6">
                                    <p>{formatdate}</p>
                                </div>
                            </div>
                            <div className="row d-flex myprofile_label">
                                <div className="col-6">
                                    <label>Address</label>
                                </div>
                                <div className="col-6">
                                    <p>{`${address.streetName} ${address.city} ${address.country}`}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
        <Outlet/>
        </div>
      
    )
}
