import React from 'react'

import DashCard from '../user/DashCard'

export default function DashboardA() {
  return (
    <div className='categoryContainer  dashboard_container'>
      <div className="row d-flex inner_dashcard">
        <DashCard name='Total Category' imgsource={require('../../assets/images/User/pending offers.jpg')} />
        <DashCard name='Total Products' imgsource={require('../../assets/images/User/complte.jpg')} />
        <DashCard name='Sold Products' imgsource={require('../../assets/images/User/cart.png')} />
        <DashCard name='Total Users' imgsource={require('../../assets/images/User/cargo.png')} />
      </div>
      {/* <div className="row d-flex inner_dashcard">
        <DashCard name='Total Vendors' imgsource={require('../../assets/images/User/pending offers.jpg')} />
        <DashCard name='Pending Offers' imgsource={require('../../assets/images/User/complte.jpg')} />
        <DashCard name='Accepted Offers' imgsource={require('../../assets/images/User/cart.png')} />
        <DashCard name='Rejected Offers' imgsource={require('../../assets/images/User/cargo.png')} />
      </div>
      <div className="row d-flex inner_dashcard">
        <DashCard name='Complete Orders' imgsource={require('../../assets/images/User/pending offers.jpg')} />
        <DashCard name='Pending Orders' imgsource={require('../../assets/images/User/complte.jpg')} />
        <DashCard name='Cancel Orders' imgsource={require('../../assets/images/User/cart.png')} />
        <DashCard name='Total Revenue' imgsource={require('../../assets/images/User/cargo.png')} />
      </div> */}
    </div>
  )
}
