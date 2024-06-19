import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import '../../Styles/App.css'
import Swal from 'sweetalert2';

import axios from 'axios';

export default function SubCategory() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/subCategoryOnId/${id}`);
        if (response) {
          setRecords(response.data);
          // console.log(response.data)
        }
      } catch (error) {
        console.error("Error fetching user Data", error);
      }
    }
    fetchUserData();
  }, [id]);

  const handleUpdateSubCategory = async (id) => {
    const category = records.find(record => record._id === id);

    const { value: formValues } = await Swal.fire({
      title: 'Update Sub Category',
      html: `
      <input id="swal-input1" class="swal2-custom-input" placeholder="Sub Category Name" value="${category.name}">
      <textarea id="swal-input2" class="swal2-custom-textarea" placeholder="Description">${category.description}</textarea>
      <input type="file" id="swal-input3" class="swal2-custom-input">
      <label for="swal-input3">Current Image: ${category.image.public_id}</label>
    `,
      focusConfirm: false,
      preConfirm: () => {
        const fileInput = document.getElementById('swal-input3');
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          fileInput.files[0] // Get the selected file
        ]
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: 'rgb(94, 37, 37)',
      customClass: {
        input: 'swal2-custom-input',
        textarea: 'swal2-custom-textarea'
      }
    });

    if (formValues) {
      const [categoryName, categoryDescription, categoryImage] = formValues;

      if (!categoryName || !categoryDescription) {
        Swal.fire('All fields are required', '', 'error');
        return;
      }

      const formData = new FormData();
      formData.append('name', categoryName);
      formData.append('description', categoryDescription);
      formData.append('category_id', category.category_id); // Add category_id if necessary
      if (categoryImage) {
        formData.append('image', categoryImage);
      }

      try {
        const response = await axios.put(`/update-subcategory/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response && response.data) {
          setRecords(prevRecords => prevRecords.map(record =>
            record._id === id ? { ...record, name: categoryName, description: categoryDescription, image: response.data.subcategory.image } : record
          ));
          Swal.fire({
            title: 'Sub Category updated successfully',
            icon: 'success',
            customClass: {
                confirmButton: 'my-custom-button'
            },
            buttonsStyling: false  // Use custom styling
        });
        } else {
          Swal.fire('Error', 'Failed to update Subcategory', 'error');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error updating Subcategory',
          text: error.response.data.msg,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)',
        });
      }
    }
  };





  const handleDeleteSubCategory = async (id) => {
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
        await axios.delete(`/delete-subcategory/${id}`);
        setRecords(records.filter(record => record._id !== id));
        // Swal.fire('Deleted!', 'Category has been deleted', 'Succesfully');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  }


  const columns = [
    {
      name: 'Image',
      maxWidth: "200px",
      selector: row => <img style={{ width: '100px', height: '80px' }} src={row.image.url} alt="" />,
    },
    {
      name: 'Name',
      selector: row => row.name,
      maxWidth: "100px",
      // minWidth:"100px",
      sortable: true
    },
    {
      name: 'Description',
      selector: row => row.description,
      maxWidth: "350px",
      // minWidth:"100px",
      sortable: true
    },
    {
      name: 'Action',
      cell: row => (
        <div className='inside_action_btn'>
          <button className="btn btn-success category_admin_btn  me-1 " onClick={() => handleUpdateSubCategory(row._id)}>Update</button>
          <button className="btn btn-danger  category_admin_btn " onClick={() => handleDeleteSubCategory(row._id)}>Delete</button>
        </div>
      ),
      maxWidth: "200px"
    }
  ]



  function handleFilter(event) {
    setSearchTerm(event.target.value);
  }

  const filteredRecords = records.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='categoryContainer'>
        <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
          <h1>Sub Categories</h1>

          <div className=" pt-1 text-end"><label className='me-2 fs-6'>Search</label><input type="text" onChange={handleFilter} /></div>
          <div className="tableContainer mt-3">
            <DataTable
              keyField='_id'
              columns={columns}
              data={filteredRecords}
              //  selectableRows
              fixedHeader
              fixedHeaderScrollHeight='300px'
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
