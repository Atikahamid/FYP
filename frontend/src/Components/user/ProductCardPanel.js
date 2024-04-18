import React from 'react'
import ProductCard from './ProductCard'

export default function ProductCardPanel() {
  return (
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
  )
}
