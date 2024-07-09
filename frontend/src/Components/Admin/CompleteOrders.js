import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

export default function CompleteOrders() {
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
      name: 'Quantity',
      selector: row => row.quantity,
      maxWidth: "10px"
    },
    {
      name: 'Total Price',
      selector: row => row.tprice,
      maxWidth: "10px"
    },
    {
      name: 'Delivery Date',
      selector: row => row.delivery_date,
      maxWidth: "10px"
    },
    {
      name: 'Return Statement',
      selector: row => row.return_statement,
      maxWidth: "10px"
    }
  ];

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get('/product/order-deliver', {

        });
        // Transform data to match DataTable's columns
        const transformedData = response.data.map(order => ({
          product: order.items.map(item => item.product.title).join(', '),
          vendor_id: order.vendor._id,
          customer_id: order.user._id,
          uprice: order.items.map(item => item.product.price).join(', '),
          quantity: order.items.length,
          tprice: order.totalAmount,
          delivery_date: order.deliveryDate, // Assuming you have deliveryDate in your schema
          return_statement: 'N/A' // Adjust as per your data
        }));

        setRecords(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completed orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  const handleFilter = (event) => {
    setSearch(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.product.toLowerCase().includes(search.toLowerCase())
  );

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
        <h1>Completed Orders</h1>
        <div className="pt-1 text-end">
          <label className='me-2 fs-6'>Search</label>
          <input type="text" onChange={handleFilter} value={search} />
        </div>
        <div className="tableContainer mt-3">
          <DataTable
            keyField='_id'
            columns={columns}
            data={filteredRecords}
            fixedHeader
            fixedHeaderScrollHeight='300px'
            pagination
          />
        </div>
      </div>
    </div>
  );
}
