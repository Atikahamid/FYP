import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Outlet } from 'react-router-dom';

export default function OrderSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const [totalPrice, setTotalPrice] = useState(0);
  const [userAddress, setUserAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/get-user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const address = response.data.address;
        const combinedAddress = `${address.streetName}, ${address.city}, ${address.postalCode}, ${address.country}`;
        setUserAddress(combinedAddress);
        setPhoneNumber(response.data.getaUser.phoneNumber);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productIds = selectedItems.map(item => item.id);
        if (productIds.length > 0) {
          const response = await axios.post('/getAProduct', { productIds });
          setProductDetails(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProductDetails();

    const total = selectedItems.reduce((sum, item) => sum + item.totalprice, 0);
    setTotalPrice(total);
  }, [selectedItems]);

  const handleCompleteOrder = async () => {
    try {
      const token = localStorage.getItem('token');

      // Prepare items for the API request
      const items = selectedItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      console.log(items);
      await axios.post(
        '/product/create-order',
        {
          items,
          shippingAddress: userAddress // Use actual shipping address
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      Swal.fire({
        title: 'Order placed successfully',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor:'rgb(94, 37, 37)'
      }).then(() => {
        navigate('/user/myorders'); // Redirect to orders page or any other page
      });
    } catch (error) {
      console.error('Error placing order', error);
      Swal.fire({
        title: 'There was an error creating the order.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor:'rgb(94, 37, 37)'
      });
    }
  };

  const handleEditAddress = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Address',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Street Name" value="${userAddress.split(',')[0]}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="City" value="${userAddress.split(',')[1].trim()}">` +
        `<input id="swal-input3" class="swal2-input" placeholder="Postal Code" value="${userAddress.split(',')[2].trim()}">` +
        `<input id="swal-input4" class="swal2-input" placeholder="Country" value="${userAddress.split(',')[3].trim()}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value
        ];
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Cancel'
    });

    if (formValues) {
      const [streetName, city, postalCode, country] = formValues;
      try {
        const token = localStorage.getItem('token');
        await axios.put('/update-user', {
          streetName,
          city,
          postalCode,
          country
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const updatedAddress = `${streetName}, ${city}, ${postalCode}, ${country}`;
        setUserAddress(updatedAddress);
        Swal.fire({
          title: 'Success',
          text: 'Address updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error('Error updating address', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the address.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  return (
    <div>
      <div className='categoryContainer'>
        <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
          <h1 className='m-2 mb-3'>Order Summary</h1>
          <hr />
          {selectedItems.map(item => {
            const productDetail = productDetails.find(product => product._id === item.id);
            return (
              <div key={item.productId} className="row justify-content-evenly">
                <div className="col-2 orderproduct_image">
                  <img src={productDetail?.images[0].url} alt={item.name} />
                </div>
                <div className="col-8">
                  <div>
                    <p className='order_ptag'>{item.name}</p>
                    <div className="row d-flex">
                      <div className='col-6 d-flex flex-column'>
                        <div><label className='order_label'>Unit Price</label><span>Rs.{item.unitprice}</span></div>
                        <div><label className='order_label'>Quantity</label><span className='label_span'>{item.quantity}</span></div>
                        <div><label className='order_label fw-bold total_order'>Total Price</label><span className='fw-bold'>Rs.{item.totalprice}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
          <div className="d-flex row flex-row">
            <div className="col-4 sub_total d-flex fw-bold"><p>Sub Total</p><span className='fw-bold'>Rs.{totalPrice}</span></div>
            <div className=" col-6 text-end"><button className='edit_address_btn' onClick={handleEditAddress}>Edit Address</button></div>
          </div>
          <div className="address_info">
            <div><label className='order_label'>Shipping Address: </label><span style={{ marginLeft: '1rem' }}>{userAddress}</span></div>
            <div><label className='order_label'>Contact No.</label><span style={{ marginLeft: '3rem' }}>{phoneNumber}</span></div>
          </div>
          <div>
            <button className="btn complete_order_btn" onClick={handleCompleteOrder}>Complete Order</button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
