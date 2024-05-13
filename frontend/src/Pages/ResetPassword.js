import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import '../Styles/App.css'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-hot-toast'
import { Formik, Form, Field } from 'formik'
// import { loginValidation } from '../Validation/loginValidation'
// import Swal from 'sweetalert2';
import { resetPasswordValidation } from '../Validation/resetPasswordValidation';


const initialValues = {
    password: '',
    cpassword:'',
  }
export default function ResetPassword() {
    const navigate = useNavigate();
    const {token }= useParams()
  

  const onSubmit = async (values) => {
    const {cpassword, ...data } = values;
   const response = axios.post('/resetPassword/'+token , data).catch((err) => {
    if(err && err.response)
      console.log("Error: ", err);

   });
   if(response){
    navigate('/login');
   }

    // .then(response =>{
    //     if(response.data.status){
    //         Swal.fire("check your email for reset password link");
    //         navigate('/login');
    //     }
    // })
    // .catch((err) => {
    //     console.log("Error: ", err);
    // });
   
  }
  return (
    <div className='row justify-content-center categoryContainer_login '>
    <div className="col-4 inner  mt-3 p-5  mt-3 pt-2">
      <h1 className='pb-4'>Reset Password</h1>
      <div className="row login_box ms-3  ">
        <Formik
        initialValues={initialValues}
        validationSchema={resetPasswordValidation}
        onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="user_box">
              <Field type="password"  name='password'  required></Field>
                <label>Password</label>
              </div>
              {errors.password && touched.password && <p className='text-danger w-100 p-0 '>{errors.password}</p>}
              <div className="user_box">
              <Field type="password"  name='cpassword'  required></Field>
                <label>Confirm Password</label>
              </div>
              {errors.cpassword && touched.cpassword && <p className='text-danger w-100 p-0 '>{errors.cpassword}</p>}

              <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
                <button className="updatebtn p-2" type='submit'>Reset</button>
              </div>
            </Form>
          )}
        </Formik>


      </div>

    </div>
  </div>
  )
}
