import React from 'react'

export default function ProductCard() {
  return (
    <div className='categorycard mt-5'>
      <img src={require ('../../images/pic.jpg')} alt="" />
      <div className="desc">
        <h3 className='name'>Name</h3>
        <h2>price</h2>
        <button className="viewDetails">View Details</button>
      </div>
    </div>
  )
}
