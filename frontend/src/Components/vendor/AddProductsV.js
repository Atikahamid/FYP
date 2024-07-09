import React, { useEffect, useState } from 'react'
import '../../Styles/App.css'
import {  Formik, Form, Field } from 'formik'
import axios from 'axios' 
// import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { addProductValidation } from '../../Validation/addproductvalidation'

const initialValues = {
  title: '',
  description: '',
  price: '',
  quantity: '',
  condition: '',
  makes_model_year:'',
  brand:'',
  vendor_id: localStorage.getItem('id') || '',
  category_name:'',
  subcategory_name:'',
  images: null
}

export default function AddProductsV() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  useEffect(() => {
    axios.get('/get_category')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('There was an error fetching categories',error);
    });
  }, [])


  const fetchSubcategories = (categoryId) => {
    axios.get(`/subCategoryOnId/${categoryId}`)
      .then(response => {
        setSubcategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategories!", error);
      });
  };


  const onSubmit = async(values, {resetForm}) => {
    const formData = new FormData();
    console.log(formData);
    for(let key in values){
      if(key === 'images'){
        for(let i = 0; i< values.images.length; i++){
          formData.append('images', values.images[i]);
        }
      }else{
        formData.append(key, values[key]);
      }
    }
    console.log("forma data: ", formData);
    axios.post('/product/create-product', formData)
    .then(response => {
      console.log('Product created successfully', response.data)
      Swal.fire({
        title: 'Product added successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: 'rgb(94, 37, 37)'
    });
      resetForm();
    })
    .catch(error => {
      console.error('error creating product', error);
      Swal.fire({
        title: 'Error adding product',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'rgb(94, 37, 37)'
    });
    });
  };


  
  return (
    <div className='categoryContainer'>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <h1>Add a Product</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={addProductValidation}
      onSubmit={onSubmit}
      >
        {({errors, touched, setFieldValue}) => (
          <Form>
          <div className="inner m-2 p-5 mt-3 pt-1">
          
          <div className="row profilerow">
            <div className="col-12 form_div ">
              <label className='form_label'>Product Title </label>
               <Field type="text" name='title' className='form_control' placeholder='product title'/>
               {errors.title && touched.title && <p className='text-danger w-100 p-2 '>{errors.title}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'>Category </label>
              <Field as='select'name='category_id' className=' form_select form_Field' onChange={(e) => {
                      const categoryId = e.target.options[e.target.selectedIndex].getAttribute('data-id');
                      const categoryName = e.target.value;
                      setFieldValue("category_name", categoryName);
                      fetchSubcategories(categoryId);
                    }}>
                <option value="" label="Select category" />
                      {categories.map((category) => (
                        <option key={category._id} value={category.name} data-id = {category._id}>{category.name}</option>
                      ))}
              </Field>
              {errors.category_name && touched.category_name && <p className='text-danger w-100 p-2 '>{errors.category_name}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'> Sub Category </label>
              <Field as='select' name='subcategory_name' className=' form_select form_Field'>
              <option value="" label="Select subcategory" />
                      {subcategories.map((subcategory) => (
                        <option key={subcategory._id} value={subcategory.name}>{subcategory.name}</option>
                      ))}
              </Field>
              {errors.subcategory_name && touched.subcategory_name && <p className='text-danger w-100 p-2 '>{errors.subcategory_name}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'>Makes,models,Years </label>
               <Field type="text" name='makes_model_year' className='form_control' placeholder='makes, model, year'/>
               {errors.makes_model_year && touched.makes_model_year && <p className='text-danger w-100 p-2 '>{errors.makes_model_year}</p>}
            </div>
            <div className="col-6 form_div ">
              <label className='form_label'>Condition </label>
              <Field as='select' name='condition' className='form_select form_Field'>
              <option value= ''>Select Condition</option>
                <option value= 'used'>Used</option>
                <option value= 'new'>New</option>
              </Field>
              {errors.condition && touched.condition && <p className='text-danger w-100 p-2 '>{errors.condition}</p>}
            </div>
            <div className="col-6 form_div ">
              <label className='form_label'>Brand </label>
               <Field type="text"  name='brand' className='form_control' placeholder='brand'/>
               {errors.brand && touched.brand && <p className='text-danger w-100 p-2 '>{errors.brand}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'>Unit Price </label>
               <Field type="text"  name='price' className='form_control' placeholder='unit price'/>
               {errors.price && touched.price && <p className='text-danger w-100 p-2 '>{errors.price}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'>Description </label>
               <Field type="text"  name='description' className='form_control' placeholder='description'/>
               {errors.description && touched.description && <p className='text-danger w-100 p-2 '>{errors.description}</p>}
            </div>
            <div className="col-12 form_div ">
              <label className='form_label'>Quantity Available </label>
               <Field type="text"  name='quantity' className='form_control' placeholder='quantity available'/>
               {errors.quantity && touched.quantity && <p className='text-danger w-100 p-2 '>{errors.quantity}</p>}
            </div>
            <div className="col-12 form_div file_Field ">
              <label className='form_label'>Image Selected </label>
               <input type="file"  name='images' className='form_control '  onChange={(event) => setFieldValue("images", event.currentTarget.files)} 
                 multiple/>
               {errors.images && touched.images && <p className='text-danger w-100 p-2 '>{errors.images}</p>}
            </div>
            <div className="col-12 mt-3 p-3 addproduct_btn">
              <button type='submit' className="updatebtn">Add Product</button>
            </div>
    
            </div>
          </div>
          </Form>
        )}

        
      </Formik>
    </div>
    </div>
  )
}
