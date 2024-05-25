import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import axios from 'axios'

export default function UserList() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
          <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
          <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
          <button className="btn btn-danger  category_admin_btn  ">Delete</button>
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
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);
  // const data = [
  //   {
  //     id: 1,
  //     user_name: 'Khadija Azam',
  //     email: 'khadija@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   },
  //   {
  //     id: 2,
  //     user_name: 'Atika Hamid',
  //     email: 'atika@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   },
  //   {
  //     id: 3,
  //     user_name: 'Khadija Azam',
  //     email: 'khadija@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   },
  //   {
  //     id: 4,
  //     user_name: 'Khadija Azam',
  //     email: 'khadija@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   },
  //   {
  //     id: 5,
  //     user_name: 'Khadija Azam',
  //     email: 'khadija@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   },
  //   {
  //     id: 6,
  //     user_name: 'Khadija Azam',
  //     email: 'khadija@gmail.com',
  //     paswword: '1233',
  //     phone: '03244826836',
  //     address: 'block-A street no.354',
  //     action: <div className='inside_action_btn'>
  //       <button className="btn btn-primary  category_admin_btn me-1 ">Details</button>
  //       <button className="btn btn-success category_admin_btn  me-1 ">Update</button>
  //       <button className="btn btn-danger  category_admin_btn  ">Delete</button>
  //     </div>
  //   }
  // ]


  function handleFilter(event) {
    setSearchTerm(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='categoryContainer'>
      <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
        <h1>User List</h1>
        <div className=" pt-1 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
        <div className="tableContainer mt-3">
          <DataTable
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
