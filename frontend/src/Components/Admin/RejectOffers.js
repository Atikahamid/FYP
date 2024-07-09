import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import '../../Styles/App.css'
import axios from 'axios'
export default function RejectOffers() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPendingOffers = async () => {
      try {
        const response = await axios.get('/get-reject');
        const offerData = response.data.map(offer => ({

          product: offer.product_id.title,
          vendor: offer.vendor_id.email,
          customer: offer.user_id.email,
          oquantity: offer.quantity,
          oprice: offer.offer_price,
          tprice: offer.product_id.price * offer.quantity,
          action: (
            <div className='inside_action_btn'>
              <button className="btn btn-danger category_admin_btn me-1" onClick={() => handleDelete(offer._id)}>Delete</button>
            </div>
          )
        }));
        setRecords(offerData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers pending data', error);
        setLoading(false);
      }
    };
    fetchPendingOffers()
  }, []);

  const handleDelete = async (OfferId) => {
    console.log('delete function');
  }
  const columns = [
    {
      name: 'Product',
      selector: row => row.product,
      maxWidth: '200px',
      sortable: true
    },
    {
      name: 'Vendor ID',
      selector: row => row.vendor,
      maxWidth: '70px',
      sortable: true
    },
    {
      name: 'Customer ID',
      selector: row => row.customer,
      maxWidth: '70px',
      sortable: true
    },
    {
      name: 'Offer Quantity',
      selector: row => row.oquantity,
      maxWidth: '30px'
    },
    {
      name: 'Offer Price',
      selector: row => row.oprice,
      maxWidth: '30px'
    },
    {
      name: 'Total Original Price',
      selector: row => row.tprice,
      maxWidth: '30px'
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth: '100px'
    }
  ];



  const handleFilter = (event) => {
    setSearch(event.target.value);
  };
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
        <h1>Rejected Offers</h1>
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
