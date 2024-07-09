import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios'
import Swal from 'sweetalert2';
import { Outlet, useNavigate } from 'react-router-dom';


export default function UserList() {
  const navigate= useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: 'User Name',
      selector: row => row.fullName,
      maxWidth: "150px",
      // minWidth:"100px",
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      maxWidth: "180px",
      sortable: true
    },
    {
      name: 'Phone No.',
      selector: row => row.phoneNumber,
      maxWidth: "20px"
    },
    {
      name: 'Address',
      selector: row => row.addressId ? `${row.addressId.streetName} ${row.addressId.city} ${row.addressId.country}` : 'N/A',
      maxWidth: "100px"
    },
    {
      name: 'Action',
      cell: row => (
        <div className='inside_action_btn'>
          <button className="btn btn-primary  category_admin_btn me-1" onClick={() => handleDetailsUser(row._id)}>Details</button>
          <button className="btn btn-danger  category_admin_btn " onClick={() => handleDeleteUser(row._id)}>Delete</button>
        </div>
      ),
      maxWidth: "300px"
    }
  ];

  //using useEffectto fetch data
  useEffect(() => {
    axios.get('/accountmanagement/userlist')
      .then(response => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, []);
  


  const handleDetailsUser = async( id) =>{
    navigate(`/admin/accountmanagement/userlist/profile/${id}`)
  }
//delete user
const handleDeleteUser = async (id) => {
  const {isConfirmed } =await Swal.fire({
    title: 'Are you sure?',
    text:"You want be able to revert this!",
    icon:"warning",
    showCancelButton: true,
    confirmButtonText:'Yes, delete it!',
    cancelButtonText:'No, cancel',
    confirmButtonColor: 'rgb(94, 37, 37)',
    cancelButtonColor: '#d33'
  });

  if(isConfirmed){
    try {
      await axios.delete(`/delete-user/${id}`);
      setRecords(records.filter(record => record._id !== id));
      // Swal.fire('Deleted!', 'Category has been deleted', 'Succesfully');
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  }
};
  function handleFilter(event) {
    setSearchTerm(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if(loading){
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
}

  return (
    <div>
      <div className='categoryContainer pb-5'>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <h1>User List</h1>
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
    <Outlet/>
    </div>
  )
}
