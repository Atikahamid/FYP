import React from 'react'
import ProductCard from './ProductCard'
import { Outlet } from 'react-router-dom' 

export default function ProductCardPanel() {
  return (
    <div>
    <div className='container-fluid categoryContainer' >
        <div className="row d-flex justify-content-evenly">
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal.jpg')}/></div>
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal2.webp')}/></div>
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal3.webp')}/></div>
        </div>
        <div className="row d-flex justify-content-evenly">
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal4.webp')}/></div>
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal5.webp')}/></div>
            <div className="col-3"><ProductCard imgSource={require('../../assets/images/User/pedal6.jpg')}/></div>
        </div>
    </div>
    <Outlet/>
    </div>
  )
}
