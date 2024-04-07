import React , { useState }from 'react'
import DataTable from 'react-data-table-component';

export default function CancelOrders() {
  const columns = [
    {
      name: 'Product',
      selector: row => row.product,
      maxWidth:"150px",
      // minWidth:"100px",
      sortable:true
    },
    {
      name: 'Vendor ID',
      selector: row => row.vendor_id,
      maxWidth:"120px",
      sortable:true
    },
    {
      name: 'Customer ID',
      selector: row => row.customer_id,
      maxWidth:"120px",
      sortable:true
    },
    {
      name: 'Unit Price',
      selector: row => row.uprice,
      maxWidth:"10px"
    },
    {
      name: 'quantity',
      selector: row => row.quantity,
      maxWidth:"10px"
    },
    {
      name: 'Total Price',
      selector: row => row.tprice,
      maxWidth:"10px"
    },
    {
      name: 'Cancelled Date',
      selector: row => row.cancel_date,
      maxWidth:"50px"
    }
  ]
  const data = [
    {
      id: 1,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022'
    },
    {
      id: 2,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022'
    },
    {
      id: 3,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022'
    },
    {
      id: 4,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022'
    },
    {
      id: 5,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022'
    },
    {
      id: 6,
      product: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id: 'khadija@gmail.com',
      uprice: 4650000,
      quantity: 34,
      tprice:87487,
      cancel_date:'23/4/2022' 
    }
  ]
  const [records,setRecords]= useState(data);

  function handleFilter(event){
    const newData=data.filter(row=>{
      return row.product.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
  }
  return (
    <div className='categoryContainer'>
    <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <h1>Cancelled Orders</h1>
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
