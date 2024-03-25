import React from 'react'
import '../../Styles/App.css'

export default function AddProductsV() {
  return (
    <div className='categoryContainer'>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <h1>Add a Product</h1>
      <div className="inner m-2 p-5 mt-3 pt-1">
      <div className="row profilerow">
        <div className="col-12 form_div ">
          <label className='form_label'>Product Title </label>
           <input type="text" className='form_control' placeholder='product title'/>
        </div>
        <div className="col-12 form_div ">
          <label className='form_label'>Category </label>
          <select className='form_select'>
            <option>doors</option>
            <option>windows</option>
            <option>mirrors</option>
            <option>bonuts</option>
            <option>engines</option>


          </select>
        </div>
        <div className="col-12 form_div ">
          <label className='form_label'>Makes,models,Years </label>
           <input type="text" className='form_control' placeholder='makes, model, year'/>
        </div>
        <div className="col-6 form_div ">
          <label className='form_label'>Condition </label>
          <select className='form_select'>
            <option>Used</option>
            <option>New</option>

          </select>
        </div>
        <div className="col-6 form_div ">
          <label className='form_label'>Brand </label>
           <input type="text" className='form_control' placeholder='brand'/>
        </div>
        <div className="col-12 form_div ">
          <label className='form_label'>Unit Price </label>
           <input type="text" className='form_control' placeholder='unit price'/>
        </div>
        <div className="col-12 form_div ">
          <label className='form_label'>Description </label>
           <input type="text" className='form_control' placeholder='description'/>
        </div>
        <div className="col-12 form_div ">
          <label className='form_label'>Quantity Available </label>
           <input type="text" className='form_control' placeholder='quantity available'/>
        </div>
        <div className="col-12 form_div file_input ">
          <label className='form_label'>Image Selected </label>
           <input type="file" className='form_control '/>
        </div>
        <div className="col-12 mt-3 p-3 addproduct_btn">
          <button className="updatebtn">Add Product</button>
        </div>

        </div>
      </div>
    </div>
    </div>
  )
}
