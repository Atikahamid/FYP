import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../Styles/App.css'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
import { Formik, Form, Field } from 'formik'
import { loginValidation } from '../Validation/loginValidation'
import Swal from 'sweetalert2';


const initialValues = {
    email: '',
  }
export default function ForgetPassword() {
    const navigate = useNavigate();

  

  const onSubmit = async (values) => {
    const { ...data } = values;

    axios.post('/forget-password', data)
    .then(response =>{
        if(response.data.status){
            Swal.fire("check your email for reset password link");
            navigate('/login');
        }
    })
    .catch((err) => {
        console.log("Error: ", err);
    });
   
  }
  return (
    <div className='row justify-content-center categoryContainer_login '>
    <div className="col-4 inner  mt-3 p-5  mt-3 pt-2">
      <h1 className='pb-4'>Forget Password</h1>
      <div className="row login_box ms-3  ">
        <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="user_box">
              <Field type="email"  name='email'  required></Field>
                <label>Email</label>
              </div>
              {errors.email && touched.email && <p className='text-danger w-100 p-0 '>{errors.email}</p>}
              <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
                <button className="updatebtn p-2" type='submit'>Send</button>
                
              </div>
            </Form>
          )}
        </Formik>


      </div>

    </div>
  </div>
  )
}
