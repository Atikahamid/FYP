import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom';

export default function CategoryCard(props) {
  const navigate=useNavigate();
  const handleCategory=()=>{
    navigate(`/user/partscategory/${props.id}/productCardPanel`);
    // <Outlet/>
  }
  return (
    <div> 
    <div className='categorycard mt-5'>
      <img src={props.imgSource} alt="" />
      <div className="desc">
        <h2 className='Productname'>{props.name}</h2>
        <button className="viewProduct" onClick={handleCategory}>View Products</button>
      </div>
    </div>
    <Outlet/>
    </div>
  )
}
