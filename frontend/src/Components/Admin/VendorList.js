import React , { useState }from 'react'
import DataTable from 'react-data-table-component';
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { FaPen } from "react-icons/fa";

export default function VendorList() {
  const columns = [
    {
      name: 'User Name',
      selector: row => row.user_name,
      maxWidth:"120px",
      // minWidth:"100px",
      sortable:true
    },
    {
      name: 'Email',
      selector: row => row.email,
      maxWidth:"50px",
      sortable:true
    },
    {
      name: 'Password',
      selector: row => row.paswword,
      maxWidth:"10px"
    },
    {
      name: 'Contact No.',
      selector: row => row.phone,
      maxWidth:"20px"
    },
    {
      name: 'Address',
      selector: row => row.address,
      maxWidth:"20px"
    },
    {
      name: 'User Category',
      selector: row => row.user_category,
      maxWidth:"10px"
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
      user_name: 'Khadija Azam',
      email: 'khadija@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'individual',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    },
    {
      id: 2,
      user_name: 'Atika Hamid',
      email: 'atika@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'individual',
      action: <div className='inside_action_btn'>
         <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    },
    {
      id: 3,
      user_name: 'Khadija Azam',
      email: 'khadija@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'individual',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    },
    {
      id: 4,
      user_name: 'Khadija Azam',
      email: 'khadija@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'Business',
      action: <div className='inside_action_btn'>
         <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    },
    {
      id: 5,
      user_name: 'Khadija Azam',
      email: 'khadija@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'individual',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    },
    {
      id: 6,
      user_name: 'Khadija Azam',
      email: 'khadija@gmail.com',
      paswword: '1233',
      phone: '03244826836',
      address: 'block-A street no.354',
      user_category:'individual',
      action: <div className='inside_action_btn'>
         <button className="btn btn-primary  vendor_list_btn me-2 "><BiDetail /></button>
        <button className="btn btn-success vendor_list_btn  me-2 "><FaPen /></button>
        <button className="btn btn-danger  vendor_list_btn  "><MdDelete /></button>
      </div>
    }
  ]
  const [records,setRecords]= useState(data);

  function handleFilter(event){
    const newData=data.filter(row=>{
      return row.user_name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }
  return (
    <div className='categoryContainer'>
    <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <h1>Vendor List</h1>
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
