import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import '../../Styles/App.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddToCart() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [showCheckButton, setShowCheckButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token'); // Example of getting a token from local storage
        const response = await axios.get('/user-cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const cartItems = response.data.cart.map(item => {
          const unitPrice = item.productId.price;
          const offerPrice = item.offer_price || 0;
          const totalPrice = offerPrice > 0 ? offerPrice * item.quantity : unitPrice * item.quantity;

          return {
            id: item.productId._id,
            name: item.productId.title,
            description: item.productId.description,
            unitprice: unitPrice,
            quantity: item.quantity,
            offer_price: offerPrice,
            totalprice: totalPrice,
            action: (
              <div className='inside_action_btn'>
                <button className="btn btn-danger category_admin_btn" onClick={() => handleDelete(item.productId._id)}>Delete</button>
              </div>
            )
          };
        });

        setRecords(cartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error fetching the cart items.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this item from your cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(94, 37, 37)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`/deleteCart/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setRecords(prevRecords => prevRecords.filter(item => item.id !== productId));

          Swal.fire({
            title: 'Cart Item has been deleted Successfully',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor:'rgb(94, 37, 37)'
          });
        } catch (error) {
          console.error('Error deleting cart item', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an error deleting the cart item.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor:'rgb(94, 37, 37)'
          });
        }
      }
    });
  };

  const handleFilter = (event) => {
    const newData = records.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  };

  const handleCheckout = () => {
    const serializableItems = selectedItems.map(item => ({
      id: item.id,
      name: item.name,
      unitprice: item.unitprice,
      quantity: item.quantity,
      offer_price: item.offer_price,
      totalprice: item.totalprice,
    }));
  
    navigate('/user/addtocart/ordersummary', { state: { selectedItems: serializableItems } });
  };

  const handleSelected = ({ selectedRows }) => {
    setSelectedItems(selectedRows);
    setShowCheckButton(selectedRows.length > 0);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" style={{ color: 'rgb(94, 37, 37)', width: '3rem', height: '3rem', marginTop: '10rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      maxWidth: '250px'
    },
    {
      name: 'Description',
      selector: row => row.description,
      maxWidth: '150px'
    },
    {
      name: 'Unit Price',
      selector: row => row.unitprice,
      sortable: true,
      maxWidth: '50px'
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
      maxWidth: '50px'
    },
    {
      name: 'Total Price',
      selector: row => row.totalprice,
      sortable: true,
      maxWidth: '50px'
    },
    {
      name: 'Action',
      selector: row => row.action,
      maxWidth: '150px'
    }
  ];

  return (
    <div>
      <div className='categoryContainer'>
        <div className="inner m-5 p-2 mt-3 pt-2">
          <h1>My Cart</h1>
        </div>
        <div className="inner m-5 mt-3 p-5 pt-2 pb-2 mt-3 ">
          <div className="pt-2 text-end">
            <label className='me-2 fs-6'>Search</label>
            <input type="text" onChange={handleFilter} />
          </div>
          <div className="tableContainer mt-3">
            <DataTable
              columns={columns}
              data={records}
              selectableRows
              onSelectedRowsChange={handleSelected}
              fixedHeader
              fixedHeaderScrollHeight='300px'
              pagination
            />
            {showCheckButton && (
              <button className='btn checkOut_btn' onClick={handleCheckout}>Check Out</button>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
