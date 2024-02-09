import React from 'react'
import ProductCard from './ProductCard'

export default function ProductCardPanel() {
  return (
    <div className='container-fluid categoryContainer' >
        <div className="row">
            <div className="col"><ProductCard/></div>
            <div className="col"><ProductCard/></div>
            <div className="col"><ProductCard/></div>
        </div>
        <div className="row">
            <div className="col"><ProductCard/></div>
            <div className="col"><ProductCard/></div>
            <div className="col"><ProductCard/></div>
        </div>

    </div>
  )
}
