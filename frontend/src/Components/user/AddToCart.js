import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
// import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";

export default function AddToCart() {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable:true
    },
    {
      name: 'Description',
      selector: row => row.description
    },
    {
      name: 'Unit Price',
      selector: row => row.unitprice,
      sortable:true
    },
    {
      name: 'Quantity',
      selector: row => row.quantity
    },
    {
      name: 'Total Price',
      selector: row => row.totalprice,
      sortable:true
    },
    {
      name: 'Action',
      selector: row => row.action
    }

  ]
  const data = [
    {
      id: 1,
      name: 'wheels',
      description: 'honda civic new 2020 model',
      unitprice: '2323',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    },
    {
      id: 2,
      name: 'brakes',
      description: 'honda civic new 2020 model',
      unitprice: '578775',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    },
    {
      id: 3,
      name: 'engines',
      description: 'honda civic new 2020 model',
      unitprice: '578775',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    },
    {
      id: 4,
      name: 'bumper',
      description: 'honda civic new 2020 model',
      unitprice: '578775',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    },
    {
      id: 5,
      name: 'wheels',
      description: 'honda civic new 2020 model',
      unitprice: '2323',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    },
    {
      id: 6,
      name: 'wheels',
      description: 'honda civic new 2020 model',
      unitprice: '2323',
      quantity: <>quant</>,
      totalprice: '90292',
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary m-2"><BiDetail /></button>
        <button className="btn btn-danger"><MdDelete /></button>
      </div>
    }
   
  ]
  const [records,setRecords]= useState(data);

  function handleFilter(event){
    const newData=data.filter(row=>{
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }

  return (
    <div>
      <div className='categoryContainer'>
        <div className="inner m-5 p-2 mt-3 pt-2">
          <h1>My Cart</h1>
        </div>
        <div className="inner m-5 mt-3 p-5 pt-2 pb-2 mt-3 ">
          <div className=" pt-2 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
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
    </div>
  )
}
