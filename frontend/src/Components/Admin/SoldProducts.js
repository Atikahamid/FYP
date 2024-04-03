import React,{useState} from 'react'
import DataTable from 'react-data-table-component';


export default function SoldProducts() {
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      maxWidth:"200px",
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
      name: 'Customer ID',
      selector: row => row.customer_id,
      maxWidth:"100px",
      sortable:true
    },
    {
      name: ' Unit Price',
      selector: row => row.uprice,
      maxWidth:"10px"
    },
    {
      name: 'quantity',
      selector: row => row.quantity,
      maxWidth:"10px"
    },
    {
      name: ' Total Price',
      selector: row => row.tprice,
      maxWidth:"10px"
    },
    {
      name: 'Return Status',
      selector: row => row.return_status,
      maxWidth:"120px"
    }
  ]
  const data = [
    {
      id: 1,
      name: 'Car Brakes civic 2016 Model',
      vendor_id: 'hmna@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
    },
    {
      id: 2,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
    },
    {
      id: 3,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
    },
    {
      id: 4,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
    },
    {
      id: 5,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
    },
    {
      id: 6,
      name: 'Car Brakes Honda 2016 Model',
      vendor_id: 'khadija@gmail.com',
      customer_id:'atika@gmail.com',
      uprice: 4650,
      quantity: 34,
      tprice:345777,
      return_status: '7d left'
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
      <h1>Sold Products</h1>
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
