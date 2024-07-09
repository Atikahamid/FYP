import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import '../../Styles/App.css';
import Swal from 'sweetalert2';
import axios from 'axios'
import { Outlet, useNavigate } from 'react-router-dom';

// import { FaPen } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { BiDetail } from "react-icons/bi";

export default function Category() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate= useNavigate();
  const [loading, setLoading] =useState(true);

  //use effect fetchinfg data
  useEffect(() => {
    axios.get('/get_category')
      .then(response => {
        setRecords(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
        setLoading(false);
      });
  }, []);


  const handleCategoryClick = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Add New Category',
      html:
        '<input id="swal-input1" class=" swal2-custom-input" placeholder="Category Name">' +
        '<textarea id="swal-input2" class="swal2-custom-textarea" placeholder="Description"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
        ]
      },
      showCancelButton: true,
      confirmButtonText: 'Add',
      confirmButtonColor: 'rgb(94, 37, 37)',
      customClass: {
        input: 'swal2-custom-input',
        textarea: 'swal2-custom-textarea'
      }
    });

    if (formValues) {
      const [categoryName, categoryDescription] = formValues;

      if (!categoryName || !categoryDescription) {
        Swal.fire({
          title: 'All Fields are required',
          icon: 'error',
          customClass: {
              confirmButton: 'my-custom-button_error'
          },
          buttonsStyling: false  // Use custom styling
      });
        return;
      }

      try {
        const response = await axios.post('/create_category', {
          name: categoryName,
          description: categoryDescription
        });
        if (response && response.data) {
          console.log('data: ', response.data.category);
          setRecords(prevRecords => [...prevRecords, response.data.category]);
          Swal.fire({
            title: 'Category added successfully',
            icon: 'success',
            customClass: {
                confirmButton: 'my-custom-button'
            },
            buttonsStyling: false  // Use custom styling
        });
        } else {
          Swal.fire({
            title: 'Failed to add category',
            icon: 'error',
            customClass: {
                confirmButton: 'my-custom-button_error'
            },
            buttonsStyling: false  // Use custom styling
        });
        }
      } catch (error) {
        // console.log('error: ',error);
        Swal.fire({
          title: 'Error adding category',
          text: error.response.data.msg,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)', // Red color for the confirm button
        });
      }
    }
  };

  //creating fetch function
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/get_category');
      return response.data; // Assuming response.data.categories contains the list of categories
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  const handleSubCategoryClick = async () => {
    const categories = await fetchCategories();

    if (categories.length === 0) {
      Swal.fire({
        title: 'No categories available',
        icon: 'error',
        customClass: {
            confirmButton: 'my-custom-button_error'
        },
        buttonsStyling: false  // Use custom styling
    });
        return;
    }

    const categoryOptions = categories.reduce((options, category) => {
        options[category._id] = category.name;
        return options;
    }, {});

    const { value: formValues } = await Swal.fire({
        title: 'Add New SubCategory',
        html: `
            <div id="swal-category-options">
                ${Object.entries(categoryOptions).map(([id, name]) => `
                    <div>
                        <input type="radio" name="category" value="${id}">${name}
                    </div>
                `).join('')}
            </div>
            <input id="swal-input1" class="swal2-input swal2-custom-input" placeholder="SubCategory Name">
            <textarea id="swal-input2" class="swal2-textarea swal2-custom-textarea" placeholder="Description"></textarea>
            <input type="file" id="swal-input3" class="swal2-file-label">
        `,
        focusConfirm: false,
        preConfirm: () => {
            const selectedCategory = document.querySelector('input[name="category"]:checked');
            return [
                selectedCategory ? selectedCategory.value : null,
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').files[0] // Get the selected file
            ];
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        confirmButtonColor: 'rgb(94, 37, 37)',
        customClass: {
            input: 'swal2-custom-input',
            textarea: 'swal2-custom-textarea'
        }
    });

    if (formValues) {
        const [categoryId, subCategoryName, subCategoryDescription, subCategoryPicture] = formValues;

        if (!categoryId || !subCategoryName || !subCategoryDescription || !subCategoryPicture) {
          Swal.fire({
            title: 'All Fields are required',
            icon: 'error',
            customClass: {
                confirmButton: 'my-custom-button_error'
            },
            buttonsStyling: false  // Use custom styling
        });
            return;
        }

        const formData = new FormData();
        formData.append('name', subCategoryName);
        formData.append('description', subCategoryDescription);
        formData.append('category_id', categoryId);
        formData.append('image', subCategoryPicture); // Append the file

        try {
            const response = await axios.post('/create_subcategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
              Swal.fire({
                title: 'Sub Category added successfully',
                icon: 'success',
                customClass: {
                    confirmButton: 'my-custom-button'
                },
                buttonsStyling: false  // Use custom styling
            });
            } else {
                Swal.fire({
                  title: 'Error adding subcategory',
                  text: response.data.msg,
                  icon: 'error',
                  confirmButtonText: 'OK',
                  confirmButtonColor: 'rgb(94, 37, 37)', // Red color for the confirm button
                });
            }
        } catch (error) {
            Swal.fire({
              title: 'Error adding subcategory',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: 'rgb(94, 37, 37)', // Red color for the confirm button
            });
        }
    }
};


  const handleUpdateCategory = async (id) => {
    // Fetch current category data
    const category = records.find(record => record._id === id);

    const { value: formValues } = await Swal.fire({
      title: 'Update Category',
      html: `
        <input id="swal-input1" class="swal2-custom-input" placeholder="Category Name" value="${category.name}">
        <textarea id="swal-input2" class="swal2-custom-textarea" placeholder="Description">${category.description}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value
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
      const [categoryName, categoryDescription] = formValues;

      if (!categoryName || !categoryDescription) {
        Swal.fire({
          title: 'All Fields are required',
          icon: 'error',
          customClass: {
              confirmButton: 'my-custom-button_error'
          },
          buttonsStyling: false  // Use custom styling
      });
        return;
      }

      try {
        const response = await axios.put(`/update-category/${id}`, {
          name: categoryName,
          description: categoryDescription
        });
        if (response && response.data) {
          setRecords(prevRecords => prevRecords.map(record =>
            record._id === id ? { ...record, name: categoryName, description: categoryDescription } : record
          ));
          Swal.fire({
            title: 'Category updated successfully',
            icon: 'success',
            customClass: {
                confirmButton: 'my-custom-button'
            },
            buttonsStyling: false  // Use custom styling
        });
        } else {
          Swal.fire({
            title: 'Failed to update category',
            icon: 'error',
            customClass: {
                confirmButton: 'my-custom-button_error'
            },
            buttonsStyling: false  // Use custom styling
        });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error updating category',
          text: error.response.data.msg,
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(94, 37, 37)',
        });
      }
    }
  };

  const handleDeleteCategory = async (id) => {
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
        await axios.delete(`/delete-category/${id}`);
        setRecords(records.filter(record => record._id !== id));
        // Swal.fire('Deleted!', 'Category has been deleted', 'Succesfully');
      } catch (error) {
        Swal.fire('Error!', error.message, 'error');
      }
    }
  };
  const columns = [
    {
      name: 'Category Name',
      selector: row => row.name,
      maxWidth: "150px",
      sortable: true
    },

    {
      name: 'Description',
      selector: row => row.description,
      maxWidth: "300px"
    },
    {
      name: 'Action',
      cell: row => (
        <div className='inside_action_btn'>
          <button className="btn btn-primary category_admin_btn  me-1 " onClick={() => handleViewSubCategory(row._id)}>SubCategory</button>
          <button className="btn btn-success category_admin_btn  me-1 " onClick={() => handleUpdateCategory(row._id)}>Update</button>
          <button className="btn btn-danger  category_admin_btn " onClick={() => handleDeleteCategory(row._id)}>Delete</button>
        </div>
      ),
      maxWidth: "400px"
    }
  ];

  const handleViewSubCategory = async (id) => {
    navigate(`/admin/categorymanagement/subcategory/${id}`)
  }



  function handleFilter(event) {
    setSearchTerm(event.target.value);
  }
  const filteredRecords = records.filter(row =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className='categoryContainer'>
        <div className="inner m-5 mt-3 p-5 mt-3 pt-2">
          <h1>Category List</h1>
          <div className="category_btn text-end mb-2 ">
            <button className='btn btn-secondary m-1' onClick={handleCategoryClick}>Add Category</button>
            <button className='btn btn-secondary' onClick={handleSubCategoryClick}>Add SubCategory</button>
          </div>
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
      <Outlet />
    </div>
  )
}
