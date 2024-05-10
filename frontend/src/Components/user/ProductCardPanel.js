import React from 'react'
import ProductCard from './ProductCard'
import { Outlet } from 'react-router-dom' 

export default function ProductCardPanel() {
  return (
    <div>
    <div className='container-fluid categoryContainer' >
        <div className="row d-flex justify-content-evenly">
            <div className="col-3"><ProductCard/></div>
            <div className="col-3"><ProductCard/></div>
            <div className="col-3"><ProductCard/></div>
        </div>
        <div className="row d-flex justify-content-evenly">
            <div className="col-3"><ProductCard/></div>
            <div className="col-3"><ProductCard/></div>
            <div className="col-3"><ProductCard/></div>
        </div>
    </div>
    <Outlet/>
    </div>
  )
}
