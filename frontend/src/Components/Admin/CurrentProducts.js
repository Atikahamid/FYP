import React , { useEffect, useState }from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


export default function CurrentProducts() {
  // const navigate= useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Name',
      selector: row => row.title,
      maxWidth:"100px",
      // minWidth:"100px",
      sortable:true
    },
    {
      name: 'Vendor ID',
      selector: row => row.vendor_id.email,
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
      selector: row => row.subcategory_id.name,
      maxWidth:"15px"
    },
    {
      name: 'Action',
     cell: row => (
      <div className='inside_action_btn'>
      <button className="btn btn-success  category_admin_btn me-1" onClick={() => handleUpdateProduct(row._id)}>Update</button>
      <button className="btn btn-danger  category_admin_btn " onClick={() => handleDeleteProduct(row._id)}>Delete</button>
    </div>
     ),
      // maxWidth:"300px"
    }
  ]


  useEffect(() => {
    const fetchProducts = async() =>{
      try {
        const response= await axios.get('/product/getAll-products')
        setRecords(response.data);
        setLoading(false);
        // console.log("product data", response.data);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    }
   fetchProducts();
  }, [])
 

  const handleUpdateProduct = async(id) => {

  }

  const handleDeleteProduct = async(id) => {

  }

  function handleFilter(event){
    setSearchTerm(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  if (loading) {
    return <div class="d-flex justify-content-center">
      <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  return (
    <div className='categoryContainer'>
    <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
      <h1>Current Products</h1>
    <div className=" pt-1 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
      <div className="tableContainer mt-3">
        <DataTable
        keyField='_id'
         columns={columns}
         data={filteredRecords}
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
