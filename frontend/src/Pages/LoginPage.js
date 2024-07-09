import React, { useState } from 'react'
import axios from 'axios'
import '../Styles/App.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Formik, Form, Field } from 'formik'
import { loginValidation } from '../Validation/loginValidation'
import Swal from 'sweetalert2';

const initialValues = {
  email: '',
  password: '',
}

export default function LoginPage() {

  const navigate = useNavigate();
  const [fpassword, setFpassword] = useState(false);

  const onSubmit = async (values) => {
    const { cpassword, ...data } = values;

    const response = await axios.post('/login', data).catch((err) => {
      if (err && err.response)
        console.log("Error: ", err);
        if(err.response.data.error === 'No user found with this email')
          toast.error(err.response.data.error);
        if(err.response.data.error === 'Password do not match')
          toast.error(err.response.data.error);
        setFpassword(true);
    });

    if(response && response.data.success){
console.log(response.data);
const token = response.data.token;
const fullName = response.data.fullName;
const {role} = response.data;
const id = response.data.userId 

      localStorage.setItem('token', token);
      localStorage.setItem("fullName", fullName);
      localStorage.setItem('role', role);
      localStorage.setItem('id', id);
      toast.success('Login successful');
      if(role === 'vendor'){

        navigate('/vendor');
      }else if(role === 'customer'){
        navigate('/user');
      }else if(role === 'admin'){
        navigate('/admin')
      }

    }
   
  }

  const handleOnclick = async () => {
    const { value: userType } = await Swal.fire({
      title: 'You want to sign up as ?',
      input: 'radio',
      inputOptions: {
        seller: 'Seller',
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
      confirmButtonColor: 'rgb(94, 37, 37)'
    });

    if (userType) {
      // Redirect to appropriate signup page based on user selection
      if (userType === 'seller') {
        navigate('/registerVendor');
      } else if (userType === 'customer') {
        navigate('/registerUser');
      }
    }
  };

  //login check for user
  // const loginUser = async(e) => {
  //   e.preventDefault()
  //   // const {email, password} =data
  //   try {
  //     const response = await axios.post('/login',{
  //       email, password
  //     });
  //     if(response.data.success){
  //       setEmail('');
  //       setPassword('');
  //       navigate('/user')
  //     }
  //     else{
  //       setErrors(response.data.errors);
  //       console.log('errors in program: ',response.data.errors)
  //     }
  //   } catch (error) {
  //     console.log('the error is: ',error)
  //     // toast.error(error);
  //   }
  // }

  return (
    <div className='row justify-content-center categoryContainer_login '>
      <div className="col-4 inner  mt-3 p-5  mt-3 pt-2">
        <h1 className='pb-4'>Login</h1>
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
                {errors.email && touched.email && <p className='text-danger w-100 p-0 login_error '>{errors.email}</p>}
                <div className="user_box">
                  <Field type="password"  name='password' required ></Field>
                  <label>Password</label>
                  {fpassword && <p className='text-end forgetPassword'><Link style={{color: 'darkred'}} to='/forget-password'>Forgot Password</Link></p> }
                </div>
                {errors.password && touched.password && <p className='text-danger w-100 p-0 login_error'>{errors.password}</p>}

                <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
                  <button className=" btn updatebtn p-2" type='submit'>Login</button>
                  <p className='text-center pt-2'>Don't have  an account? <Link className='text-black' onClick={handleOnclick}>Sign Up</Link> </p>
                </div>
              </Form>
            )}
          </Formik>


        </div>

      </div>
    </div>
  )
}
