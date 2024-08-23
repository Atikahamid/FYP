import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Outlet, useNavigate } from 'react-router-dom';

export default function VendorList() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      name: 'User Name',
      selector: row => row.fullName,
      maxWidth: "120px",
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      maxWidth: "50px",
      sortable: true
    },
    {
      name: 'Contact No.',
      selector: row => row.phoneNumber,
      maxWidth: "20px"
    },
    {
      name: 'Address',
      selector: row => row.addressId ? `${row.addressId.streetName} ${row.addressId.city} ${row.addressId.country}` : 'N/A',
      maxWidth: "20px"
    },
    {
      name: 'Revenue',
      selector: row => row.revenue,
      maxWidth: '20px'
    },
    {
      name: 'Action',
      selector: row => (
        <div className='inside_action_btn'>
          <button className="btn btn-primary category_admin_btn me-2" onClick={() => handleDetailsVendor(row._id)}>Details</button>
          <button className="btn btn-danger category_admin_btn me-1" onClick={() => handleDeleteVendor(row._id)}>Delete</button>
          <button className="btn btn-success category_admin_btn" onClick={() => handleCompletePayment(row._id)}>Complete Payment</button>
        </div>
      ),
      maxWidth: "300px"
    }
  ];

  useEffect(() => {
    const fetchVendorsAndRevenue = async () => {
      try {
        const response = await axios.get('/accountmanagement/vendorlist');
        const vendorData = response.data;

        // Fetch revenue for each vendor
        const updatedVendorData = await Promise.all(vendorData.map(async vendor => {
          try {
            const revenueResponse = await axios.get(`/product/revenue/${vendor._id}`);
            return {
              ...vendor,
              revenue: revenueResponse.data.totalAmount
            };
          } catch (error) {
            console.error(`Error fetching revenue for vendor ${vendor._id}:`, error);
            return {
              ...vendor,
              revenue: 'Error'
            };
          }
        }));

        setRecords(updatedVendorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchVendorsAndRevenue();
  }, []);

  const handleDetailsVendor = async (id) => {
    navigate(`/admin/accountmanagement/vendorlist/profile/${id}`);
  };

  const handleCompletePayment = async (id) => {
    try {
      const response = await axios.post(`/product/revenue-calculation-and-transfer/${id}`);
      const { success, msg } = response.data;

      if (success) {
        Swal.fire({
          title: 'Success',
          text:msg,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text:msg,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)'
        });
       
      }
    } catch (error) {
      Swal.fire({
        title:error.response.data.msg ,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'rgb(94, 37, 37)'
      });
     
    }
  };

  const handleDeleteVendor = async (id) => {
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
        await axios.delete(`/delete-vendor/${id}`);
        setRecords(records.filter(record => record._id !== id));
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };

  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecords = records.filter(row =>
    row.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='categoryContainer pb-5'>
        <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
          <h1>Vendor List</h1>
          <div className="pt-1 text-end">
            <label className='me-2 fs-6'>Search</label>
            <input type="text" onChange={handleFilter} />
          </div>
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
      <Outlet />
    </div>
  );
}
