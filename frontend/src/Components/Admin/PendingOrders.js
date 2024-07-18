import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function PendingOrders() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const columns = [
    {
      name: 'Product',
      selector: row => row.product,
      maxWidth: "100px",
      sortable: true
    },
    {
      name: 'Vendor ID',
      selector: row => row.vendor_id,
      maxWidth: "100px",
      sortable: true
    },
    {
      name: 'Customer ID',
      selector: row => row.customer_id,
      maxWidth: "100px",
      sortable: true
    },
    {
      name: 'Unit Price',
      selector: row => row.uprice,
      maxWidth: "10px"
    },
    {
      name: 'quantity',
      selector: row => row.quantity,
      maxWidth: "10px"
    },
    {
      name: 'Total Price',
      selector: row => row.tprice,
      maxWidth: "10px"
    },
    {
      name: 'Action',
      selector: row => row.action
    }
  ];

  const handleCancel = useCallback(async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You want be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it save',
      confirmButtonColor: 'rgb(94, 37, 37)',
      cancelButtonColor: '#d33'
    });
    if (isConfirmed) {
      try {
        const response = await axios.put(`/product/cancel-order/${id}`);
        if (response.data.success) {
          setRecords(records.map(record => record._id === id ? { ...record, status: 'Cancelled' } : record));
        }
      } catch (error) {
        console.error('Error cancelling order', error);
      }
    }

  }, [records]);

  const handledeliver = useCallback(async (id) => {
    try {
      const response = await axios.put(`/product/update-status/${id}`);
      if (response.data.success) {
        setRecords(records.map(record => record._id === id ? { ...record, status: 'Delivered' } : record));
      }
    } catch (error) {
      console.error('Error completing order', error);
    }
  }, [records]);

  const fetchPendingOrders = useCallback(async () => {
    try {
      const response = await axios.get('/product/order-pending');
      const transformedData = response.data.map(order => ({
        product: order.items.map(item => item.product.title).join(', '),
        vendor_id: order.vendor.email,
        customer_id: order.user.email,
        uprice: order.items.map(item => item.product.price).join(', '),
        quantity: order.items.length,
        tprice: order.totalAmount,
        action: (
          <div className='inside_action_btn'>
            <button className="btn btn-danger category_admin_btn me-1" onClick={() => handleCancel(order._id)}>Cancel</button>
            <button className="btn btn-primary category_admin_btn" onClick={() => handledeliver(order._id)}>Complete</button>
          </div>
        )
      }));
      setRecords(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching completed orders', error);
    } finally {
      setLoading(false);
    }
  }, [handleCancel, handledeliver]);

  useEffect(() => {
    fetchPendingOrders();
  }, [fetchPendingOrders]);

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  const filteredRecords = records.filter(row => row.product.toLowerCase().includes(search.toLowerCase()));

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
    <div className='categoryContainer'>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <h1>Pending Orders</h1>
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
          />
        </div>
      </div>
    </div>
  );
}
