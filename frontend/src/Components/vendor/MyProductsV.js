import React, { useEffect, useState } from 'react'
import '../../Components/user/User.css'
import DataTable from 'react-data-table-component';
import { MdDelete } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { FaPen } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom';

export default function MyProductsV() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'Image',
      selector: row => <img style={{ width: '100px', height: '80px' }} src={row.images[0]?.url} alt="" />,
      maxWidth: '200px'
    },
    {
      name: 'Title',
      selector: row => row.title,
      maxWidth: '100px'
    },
    {
      name: 'Description',
      selector: row => row.description,
      maxWidth: '100px'
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      maxWidth: "100px"
    },
    {
      name: 'Unit Price',
      selector: row => row.price,
      maxWidth: "170px"
    },
    {
      name: 'Action',
      cell: row => (
        <div className='inside_action_btn'>
          <button className="btn btn-primary me-2" onClick={() => handleDetailProduct(row._id)}><BiDetail /></button>
          <button className="btn btn-danger me-2" onClick={() => handleDeletProduct(row._id)}><MdDelete /></button>
          <button className='btn btn-success' onClick={() => handleUpdateProduct(row._id)}><FaPen /></button>
        </div>
      ),
      maxWidth: "500px"
    }

  ];

  const handleDetailProduct = async (id) => {
    navigate(`/vendor/myproducts/product-detail/${id}`);
  }

  const handleDeletProduct = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You want be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      confirmButtonColor: 'rgb(94, 37, 37)',
      cancelButtonColor: '#d33'
    });

    if (isConfirmed) {
      try {
        await axios.delete(`/product/delete-product/${id}`);
        setRecords(records.filter(record => record._id !== id));
        // Swal.fire('Deleted!', 'Category has been deleted', 'Succesfully');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  }

  const handleUpdateProduct = async (id) => {
    navigate(`/vendor/myproducts/update-product/${id}`);
  }
  useEffect(() => {
    const fetchProduct = async () => {
      const vendorId = localStorage.getItem('id');
      if (vendorId) {
        try {
          const response = await axios.get(`/product/getproductvendor/${vendorId}`);
          setRecords(response.data);
          setLoading(false);
          console.log("data", response.data);
        } catch (error) {
          console.error("Error fetching products", error);
          setLoading(false);
        }
      }
    };
    fetchProduct();
  }, []);



  function handleFilter(event) {
    setSearchTerm(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div class="d-flex justify-content-center">
      <div class="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  }
  return (
    <div>
      <div className='categoryContainer'>
        <div className="inner m-5 p-2 mt-3 pt-2">

          <h1>My Products</h1>
        </div>
        <div className="inner m-5 mt-3 p-5 pt-2 pb-2 mt-3 ">
          <div className=" pt-2 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
          <div className="tableContainer mt-3">
            <DataTable
              keyField='_id'
              columns={columns}
              data={filteredRecords}
            //  selectableRows
            //  fixedHeader
            //  fixedHeaderScrollHeight='300px'
            //  pagination
            ></DataTable>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
