import React from 'react'
import CategoryCard from './CategoryCard'
// import { Outlet } from 'react-router-dom'

export default function CategoryCardPanel(props) {
  return (
    <div className='container-fluid'>
      <div className="inner m-5 p-2 mt-3 pt-2 mb-0">

        <h1>{props.name}</h1>
      </div>
      <div className="row d-flex justify-content-evenly">
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/h2.jpg')}/></div>
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/tyre1.webp')} /></div>
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/doors.jpg')}/></div>
      </div>
      <div className="row d-flex justify-content-evenly">
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/pic.jpg')}/></div>
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/pic.jpg')}/></div>
        <div className="col-3"><CategoryCard imgSource={require('../../assets/images/User/pic.jpg')}/></div>
      </div>
{/* <Outlet/> */}
    </div>
  )
}
