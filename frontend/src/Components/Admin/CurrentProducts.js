import React , { useState }from 'react'
import DataTable from 'react-data-table-component';


export default function CurrentProducts() {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      maxWidth:"100px",
      // minWidth:"100px",
      sortable:true
    },
    {
      name: 'Vendor ID',
      selector: row => row.vendor_id,
      maxWidth:"100px",
      sortable:true
    },
    {
      name: 'Price',
      selector: row => row.price,
      maxWidth:"10px"
    },
    {
      name: 'quantity',
      selector: row => row.quantity,
      maxWidth:"10px"
    },
    {
      name: 'Condition',
      selector: row => row.condition,
      maxWidth:"10px"
    },
    {
      name: 'Category',
      selector: row => row.category,
      maxWidth:"15px"
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth:"300px"
    }
  ]
  const data = [
    {
      id: 1,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 2,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650000,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 3,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650000,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 4,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650000,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 5,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650000,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 6,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      price: 4650000,
      quantity: 34,
      condition: 'Used',
      category: "car brakes",
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
  ]
  const [records,setRecords]= useState(data);

  function handleFilter(event){
    const newData=data.filter(row=>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }
  return (
    <div className='categoryContainer'>
    <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <h1>Current Products</h1>
    <div className=" pt-1 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
      <div className="tableContainer mt-3">
        <DataTable
         columns={columns}
         data={records}
         selectableRows
         fixedHeader
         fixedHeaderScrollHeight='300px'
         pagination
        ></DataTable>
      </div>
    </div>
  </div>
  )
}
