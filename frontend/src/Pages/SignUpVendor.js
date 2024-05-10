import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import { vendorSignupValidation } from '../Validation/vendorSignupValidation';

const initialValues = {
  fullName: '',
  gender: '',
  email: '',
  password: '',
  dateOfBirth: '',
  phoneNumber: '',
  entity: '',
  streetName: '',
  city: '',
  postalCode: '',
  country: '',
  cpassword: '',
}

export default function SignUpVendor() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { cpassword, ...data } = values;

    const response = await axios.post('/registerVendor', data).catch((err) => {
      if (err && err.response)
        console.log("Error: ", err);
      if (err.response.data.msg === 'Email already exist plz try with another email') {
        toast.error('Email already exist plz try with another email')
      }
    });

    if (response) {
      toast.success('successful registeration Welcome')
      navigate('/login');
    }
  }

  return (
    <div className='row justify-content-center categoryContainer'>
      <div className="col-8 inner  mt-3 p-5  mt-3 pt-2">
        <h1>Vendor Registeration</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={vendorSignupValidation}
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
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Gender</label>
                    <Field as="select" className='form_select' name="gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    {errors.gender &&  touched.gender &&  <p className='text-danger w-100 p-2 '>{errors.gender}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Email</label>
                    <Field type="email" className='form_control' name='email' ></Field>
                    {errors.email &&  touched.email &&  <p className='text-danger w-100 p-2 '>{errors.email}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Password</label>
                    <Field type="password" className='form_control' name='password'  ></Field>
                    {errors.password &&  touched.password &&  <p className='text-danger w-100 p-2 '>{errors.password}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Confirm Password</label>
                    <Field type="password" className='form_control' name='cpassword'  ></Field>
                    {errors.cpassword && touched.cpassword &&   <p className='text-danger w-100 p-2 '>{errors.cpassword}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Date of birth</label>
                    <Field type="date" className='form_control' name='dateOfBirth'></Field>
                    {errors.dateOfBirth && touched.dateOfBirth &&   <p className='text-danger w-100 p-2 '>{errors.dateOfBirth}</p>}
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="col-10 form_div">
                    <label className='form_label'>Are you: </label>
                    <label>
                   <Field type='radio'className='radio_button' name='entity' value='independent seller' />
                      Independent Seller
                    </label>
                    <label>
                    <Field type='radio' className='radio_button' name='entity' value='Business owner'/>
                      Business Owner
                    </label>
                    {errors.entity &&  touched.entity &&  <p className='text-danger w-100 p-2 '>{errors.entity}</p> }
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Phone_no.</label>
                    <Field type="number" className='form_control' name='phoneNumber' ></Field>
                    {errors.phoneNumber && touched.phoneNumber &&   <p className='text-danger w-100 p-2 '>{errors.phoneNumber}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Address</label>
                    <Field type="text" className='form_control' name='streetName' ></Field>
                    {errors.streetName && touched.streetName &&   <p className='text-danger w-100 p-2 '>{errors.streetName}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>City</label>
                    <Field as="select" className='form_select' name="city">
                      <option value="">Select city</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Faislabad">Faislabad</option>
                    </Field>
                    {errors.city &&  touched.city &&  <p className='text-danger w-100 p-2 '>{errors.city}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Postal Code</label>
                    <Field type="text" className='form_control' name='postalCode' ></Field>
                    {errors.postalCode && touched.postalCode &&   <p className='text-danger w-100 p-2 '>{errors.postalCode}</p>}
                  </div>
                  <div className="col-10 form_div">
                    <label className='form_label'>Country</label>
                    <Field as="select" className='form_select' name="country">
                      <option value="">Select country</option>
                      <option value="Pakistan">Pakistan</option>
                    </Field>
                    {errors.country && touched.country &&   <p className='text-danger w-100 p-2 '>{errors.country}</p>}
                  </div>
                </div>
              </div>
              <div className="col-12 d-grid   mt-3  me-1 pe-5 p-3 ">
                <button type='submit' className="updatebtn p-2">Sign Up</button>
                <p className='text-center pt-2'>Already has an account? <Link to="/login" className='text-black'>Login</Link> </p>
              </div>
            </Form>
          )}

        </Formik>
      </div>
    </div>
  )
}
