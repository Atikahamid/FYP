import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import axios from 'axios'
import { Outlet } from 'react-router-dom';
export default function CategoryCardPanel(props) {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch subcategories data from backend
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('/get_subcategory'); // Replace with your backend URL
        const data = response.data;
        // console.log('data: ',data);
        setSubcategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);
// Utility function to group subcategories into chunks of three
const groupIntoRows = (items, itemsPerRow) => {
  const rows = [];
  for (let i = 0; i < items.length; i += itemsPerRow) {
    rows.push(items.slice(i, i + itemsPerRow));
  }
  return rows;
};


if(loading){
  return <div class="d-flex justify-content-center">
  <div class="spinner-border" style={{color:'rgb(94, 37, 37)',width:'3rem', height:'3rem', marginTop:'10rem'}} role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
}
const subcategoryRows = groupIntoRows(subcategories, 3);

return (
<div>
<div  className='categoryContainer'>
   <div className='container-fluid'>
    <div className="inner m-5 p-2 mt-3 pt-2 mb-0">
      <h1>Parts Category</h1> 
    </div>
    {subcategoryRows.map((row, rowIndex) => (
      <div className="row d-flex justify-content-evenly" key={rowIndex}>
        {row.map((subcategory) => (
          <div className="col-3" key={subcategory._id}>
            <CategoryCard imgSource={subcategory.image.url} name={subcategory.name}  id={subcategory._id}/>
          </div>
        ))}
      </div>
    ))}
  </div>
 </div>
 <Outlet/>
</div>

);
}