import React,{useState} from 'react'
import '../../Components/user/User.css'
import DataTable from 'react-data-table-component';
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { FaPen } from "react-icons/fa";

export default function MyProductsV() {
  const columns = [
    {
      name: 'Image',
      selector: row => row.image,
    },
    {
      name: 'Description',
      selector: row => row.description
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      maxWidth:"100px"
    },
    {
      name: 'Unit Price',
      selector: row => row.price,
      maxWidth:"170px"
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth:"500px"
    }

  ]
  const data = [
    {
      id: 1,
      image:<img style={{width:"100%",height:"80px"}} src={require('../../assets/images/User/tyre1.webp')} alt=''/>,
      description: 'honda civic new 2020 model',
      quantity: 2,
      price: 45553,
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary me-2"><BiDetail /></button>
        <button className="btn btn-danger me-2"><MdDelete /></button>
        <button className='btn btn-success'><FaPen /></button>
      </div>
    },
    {
      id: 2,
      image: <img style={{width:"100%",height:"80px"}} src={require('../../assets/images/User/headlights.jpg')} alt=''/>,
      description: 'honda civic new 2020 model',
      quantity: 34,
      price: 34342,
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary me-2"><BiDetail /></button>
        <button className="btn btn-danger me-2"><MdDelete /></button>
        <button className='btn btn-success'><FaPen /></button>
      </div>
    },
    {
      id: 3,
      image: <img style={{width:"100%",height:"80px"}} src={require('../../assets/images/User/doors.jpg')} alt=''/>,
      description: 'honda civic new 2020 model',
      quantity: 34,
      price: 34342,
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary me-2"><BiDetail /></button>
        <button className="btn btn-danger me-2"><MdDelete /></button>
        <button className='btn btn-success'><FaPen /></button>
      </div>
    },
    {
      id: 4,
      image: <img style={{width:"100%",height:"80px"}} src={require('../../assets/images/User/steering.jpg')} alt=''/>,
      description: 'honda civic new 2020 model',
      quantity: 34,
      price: 34342,
      action: <div className='inside_action_btn'>
        <button className="btn btn-primary me-2"><BiDetail /></button>
        <button className="btn btn-danger me-2"><MdDelete /></button>
        <button className='btn btn-success'><FaPen /></button>
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
    <div className='categoryContainer'>
      <div className="inner m-5 p-2 mt-3 pt-2">

        <h1>My Products</h1>
      </div>
      {/* <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <div className="row justify-content-evenly">
            <div className="col-2 orderproduct_image">
              <img src={require('../../assets/images/User/steering.jpg')} alt="" />
            </div>
            <div className="col-7">
              <div>
                <p className='order_ptag'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, id.</p>
                <div className="row d-flex">
                  <div className='col-6 d-flex flex-column'>
                    <div> <label className='order_label'>Price</label><span>Rs.43526</span></div>
                    <div><label className='order_label'>Items</label><span>5</span></div>
                  </div>
                  <div className="col-6 d-flex flex-column">
                    <div> <label className='order_label'>Delivered Date</label><span>13/4/2020</span></div>
                    <div><label className='order_label'>Status</label><span className='orderstatus_span'>Delivered</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
                <div className="action_btn">
                  <button>Remove</button>
                  <button>Delete</button>
                  <button>Details</button>
                </div>
            </div>
          </div>
          <hr />
      </div> */}
      <div className="inner m-5 mt-3 p-5 pt-2 pb-2 mt-3 ">
      <div className=" pt-2 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
          <div className="tableContainer mt-3">
            <DataTable 
             columns={columns}
             data={records}
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
