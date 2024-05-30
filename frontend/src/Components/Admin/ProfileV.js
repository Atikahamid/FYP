import React,{ useEffect, useState }  from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../../Styles/App.css'

export default function ProfileV() {
    const {id} = useParams();
    const [userData, setUserData] = useState(null);
    const [address, setAddress] = useState(null);
    const [formatdate, setFormatdate] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`/get-vendorId/${id}`);
            const { getaUser, address } = response.data;
            setUserData(getaUser);
            setAddress(address);
            setFormatdate(new Date(getaUser.registrationDate).toLocaleDateString());
          } catch (error) {
            console.error('Error fetching user data', error);
          }
        };
    
        fetchUserData();
      }, [id]);
    
  return (
    <div>
    <div className='categoryContainer pb-5 profile_padding'>
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
