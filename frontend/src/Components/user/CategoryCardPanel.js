import React from 'react'
import CategoryCard from './CategoryCard'

export default function CategoryCardPanel(props) {
  return (
    <div className='container-fluid'>
      <div className="inner m-5 p-2 mt-3 pt-2 mb-0">

        <h1>{props.name}</h1>
      </div>
      <div className="row">
        <div className="col"><CategoryCard /></div>
        <div className="col"><CategoryCard /></div>
        <div className="col"><CategoryCard /></div>
      </div>
      <div className="row">
        <div className="col"><CategoryCard /></div>
        <div className="col"><CategoryCard /></div>
        <div className="col"><CategoryCard /></div>
      </div>

    </div>
  )
}
