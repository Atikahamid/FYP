import React , { useState, useEffect }from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios';

export default function CancelOrders() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
    }
  ]
 

  //fetch data
  useEffect(() => {
    const fetchCancelledOrders = async () => {
      try {
        const response = await axios.get('/product/order-cancel', {

        });
        // Transform data to match DataTable's columns
        const transformedData = response.data.map(order => ({
          product: order.items.map(item => item.product.title).join(', '),
          vendor_id: order.vendor.email,
          customer_id: order.user.email,
          uprice: order.items.map(item => item.product.price).join(', '),
          quantity: order.items.length,
          tprice: order.totalAmount,
          
        }));

        setRecords(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching completed orders', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCancelledOrders();
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
      <h1>Cancelled Orders</h1>
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
