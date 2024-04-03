import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
// import { FaPen } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { BiDetail } from "react-icons/bi";

export default function Category() {
  const columns = [
    {
      name: 'Category Name',
      selector: row => row.category_name,
      maxWidth:"150px",
      sortable:true
    },
    {
      name: 'Total no. of products',
      selector: row => row.total_products,
      maxWidth:"150px",
      sortable:true
    },
    {
      name: 'Creation Date',
      selector: row => row.creation_date,
      maxWidth:"150px"
    },
    {
      name: 'Description',
      selector: row => row.category_description,
      maxWidth:"300px"
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth:"400px"
    }
  ]
  const data = [
    {
      id: 1,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 2,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
        <button className="btn btn-success  category_admin_btn me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 3,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger category_admin_btn   ">Delete</button>
      </div>
    },
    {
      id: 4,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
        <button className="btn btn-success category_admin_btn me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn">Delete</button>
      </div>
    },
    {
      id: 5,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
        <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
        <button className="btn btn-danger  category_admin_btn  ">Delete</button>
      </div>
    },
    {
      id: 6,
      category_name: 'rollas royas',
      total_products: 23,
      creation_date: "23/3/2022",
      category_description: "Lorem ipsum dolor sit amet.",
      action: <div className='inside_action_btn'>
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
      <h1>Category List</h1>
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
