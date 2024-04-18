import React from 'react'
import {useNavigate} from 'react-router-dom';

export default function CategoryCard(props) {
  const navigate=useNavigate();
  const handleCategory=()=>{
    navigate('/ProductCardPanel');
  }
  return (
    <div className='categorycard mt-5'>
      <img src={props.imgSource} alt="" />
      <div className="desc">
        <h3 className='Productname'>Category Name</h3>
        <button className="viewProduct" onClick={handleCategory}>View Products</button>
      </div>
    </div>
  )
}
