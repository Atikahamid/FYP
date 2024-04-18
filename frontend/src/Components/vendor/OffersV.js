import React from 'react'
import DataTable from 'react-data-table-component';


export default function OffersV() {
  const columns = [
    {
      name: 'Product Name',
      selector: row => row.pname,
      // maxWidth:"150px"
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      maxWidth:"100px"
    },
    {
      name: 'Total Price',
      selector: row => row.price,
      maxWidth:"100px"
    },
    {
      name: 'Offer Price',
      selector: row => row.offerprice,
      maxWidth:"100px"
    },
    {
      name: 'Buyer Id',
      selector: row => row.b_id
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth:"200px"
    }
  ]
  const data = [
    {
      id: 1,
      pname: 'rollas royas',
      quantity: 23,
      price: 546300,
      offerprice: 45553,
      b_id: 'khadijaazam@gmail.com',
      action: <div className='inside_action_btn'>
        <button className="btn btn-success me-1 ">Accept</button>
        <button className="btn btn-danger  ">Reject</button>
      </div>
    },
    {
      id: 1,
      pname: 'rollas royas',
      quantity: 23,
      price: 546300,
      offerprice: 45553,
      b_id: 'khadijaazam@gmail.com',
      action: <div className='inside_action_btn'>
        <button className="btn btn-success me-1 ">Accept</button>
        <button className="btn btn-danger  ">Reject</button>
      </div>
    },
    {
      id: 2,
      pname: 'rollas royas',
      quantity: 23,
      price: 546300,
      offerprice: 45553,
      b_id: 'khadijaazam@gmail.com',
      action: <div className='inside_action_btn'>
        <button className="btn btn-success me-1 ">Accept</button>
        <button className="btn btn-danger  ">Reject</button>
      </div>
    },
    {
      id: 3,
      pname: 'rollas royas',
      quantity: 23,
      price: 546300,
      offerprice: 45553,
      b_id: 'khadijaazam@gmail.com',
      action: <div className='inside_action_btn'>
        <button className="btn btn-success me-1 ">Accept</button>
        <button className="btn btn-danger  ">Reject</button>
      </div>
    },
    {
      id: 4,
      pname: 'rollas royas',
      quantity: 23,
      price: 546300,
      offerprice: 45553,
      b_id: 'khadijaazam@gmail.com',
      action: <div className='inside_action_btn'>
        <button className="btn btn-success me-1 ">Accept</button>
        <button className="btn btn-danger  ">Reject</button>
      </div>
    },

  ]
  return (
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2">

        <h1>Offers</h1>
      </div>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">

        <div className="tableContainer mt-3">
          <DataTable
            columns={columns}
            data={data}
          //  selectableRows
          //  fixedHeader
          //  fixedHeaderScrollHeight='300px'
          //  pagination
          ></DataTable>
        </div>
      </div>
    </div>

  )
}
