import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';

export default function SoldProducts() {
  const [records,setRecords]= useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: 'Name',
      selector: row => row.title,
      maxWidth:"200px",
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
      name: 'Subcategory',
      selector: row => row.subcategory_id.name,
      maxWidth:"100px",
      sortable:true
    },
    {
      name: 'Condition',
      selector: row => row.condition,
      maxWidth:"100px",
      sortable:true
    },
    {
      name: ' Unit Price',
      selector: row => row.price,
      maxWidth:"10px"
    },
    {
      name: 'Sold Quantity',
      selector: row => row.sold,
      maxWidth:"10px"
    },

    {
      name: ' Total Price',
      selector: row => row.price*row.sold,
      maxWidth:"10px"
    },
  ]

  useEffect(() => {
    const fetchProducts = async() =>{
      try {
        const response = await axios.get('/product/getAllSoldProducts')
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
 


  function handleFilter(event){
    setSearch(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.title.toLowerCase().includes(search.toLowerCase())
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
      <h1>Sold Products</h1>
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
