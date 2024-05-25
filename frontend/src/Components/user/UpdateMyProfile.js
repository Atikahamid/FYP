import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios';
import {  Formik, Form, Field } from 'formik'
// import { UserSignupValidation } from '../Validation/UserSignupValidation';
const formatDateToYYYYMMDD = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export default function UpdateMyProfile() {
  const navigate= useNavigate();
  // const location = useLocation();
  // const {userData, addressData} = location.state;
  const [initialValues, setInitialValues] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phoneNumber: '',
    streetName: '',
    postalCode: '',
    cpassword: ''
  })

  const fetchData = async () =>{
    try {
        const response = await axios.get('/get-user');
       
        const userData= response.data.getaUser;
        const addressData= response.data.address;
        setInitialValues({
          fullName: userData.fullName || '',
          email: userData.email || '',
          password:  '',
          dateOfBirth:formatDateToYYYYMMDD(userData.dateOfBirth) ||  '',
          phoneNumber: userData.phoneNumber ||  '',
          streetName: addressData.streetName ||  '',
          postalCode:  addressData.postalCode || '',
          cpassword: ''
        })
    } catch (error) {
        console.error('Error fetching user Data', error);
    }
};

//useeffect function
useEffect(() => {
    fetchData();
}, []);


  const onSubmit = async (values) =>{
    const {cpassword, ...data} = values;
try {
  const response = await axios.put('/update-user', data)
  if(response.data.success){
    toast.success('Prfile updated Successfully')
    navigate('/user/myprofile');
  }
} catch (err) {
  if (err.response) {
    console.log("Error:", err.response.data.message);
    toast.error(err.response.data.message || 'Error updating profile');
}
}
  
  }
 
  // const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: UserSignupValidation,
  //   onSubmit: (values) => {
  //     console.log('these are the values: ', values)
  //   }
  // })
  // console.log('this is formik',formik)

  return (
    <div className='categoryContainer'>
     <div className="inner m-5 p-2 mt-3 pt-2">

      <h1>Update Profile</h1> 
      </div>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <div className="row profilerow">
      <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={UserSignupValidation}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row ms-3 d-flex flex-row ">
                <div className="col-6 ">
                  <div className="col-10 form_div ">
                    <label className='form_label'>Full Name </label>
                    <Field type="text" className='form_control' name='fullName' placeholder='name' ></Field>
                    {errors.fullName && touched.fullName && <p className='text-danger w-100 p-2 '>{errors.fullName}</p>}
                    {/* <p>errors should be displayed here</p> */}
                  </div>
                 
                  <div className="col-10 form_div">
                    <label className='form_label'>Email</label>
                    <Field type="email" className='form_control' name='email' ></Field>
                    {errors.email && touched.email &&  <p className='text-danger w-100 p-2 '>{errors.email}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Password</label>
                    <Field type="password" className='form_control' name='password'  ></Field>
                    {errors.password && touched.password &&  <p className='text-danger w-100 p-2 '>{errors.password}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Confirm Password</label>
                    <Field type="password" className='form_control' name='cpassword'  ></Field>
                    {errors.cpassword && touched.cpassword &&  <p className='text-danger w-100 p-2 '>{errors.cpassword}</p>}
                  </div>
                 
                </div>
                <div className="col-6 ">
                <div className="col-10 form_div">
                    <label className='form_label'>Date of birth</label>
                    <Field type="date" className='form_control' name='dateOfBirth'></Field>
                    {errors.dateOfBirth && touched.dateOfBirth &&  <p className='text-danger w-100 p-2 '>{errors.dateOfBirth}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Phone_no.</label>
                    <Field type="number" className='form_control' name='phoneNumber' ></Field>
                    {errors.phoneNumber && touched.phoneNumber &&  <p className='text-danger w-100 p-2 '>{errors.phoneNumber}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Address</label>
                    <Field type="text" className='form_control' name='streetName' ></Field>
                    {errors.streetName && touched.streetName &&  <p className='text-danger w-100 p-2 '>{errors.streetName}</p>}
                  </div>
                 
                  <div className="col-10 form_div">
                    <label className='form_label'>Postal Code</label>
                    <Field type="text" className='form_control' name='postalCode' ></Field>
                    {errors.postalCode && touched.postalCode &&  <p className='text-danger w-100 p-2 '>{errors.postalCode}</p>}
                  </div>
                  
                </div>
              </div>
              <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
                <button type='submit' className=" btn updatebtn p-2">Update Profile</button>
                
              </div>
            </Form>
          )}

        </Formik>
      </div>
     </div>
    </div>
  )
}
