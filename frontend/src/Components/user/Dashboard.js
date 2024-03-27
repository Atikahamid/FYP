import React from 'react'
import DashCard from './DashCard'

export default function Dashboard() {
  return (
    <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Pending Offers' imgsource={require('../../assets/images/User/pending offers.jpg')}/>
     <DashCard name='completed Orders' imgsource={require('../../assets/images/User/complte.jpg')}/>
     <DashCard  name='items in Cart' imgsource={require('../../assets/images/User/cart.png')}/>
     <DashCard name='Pending orders' imgsource={require('../../assets/images/User/cargo.png')}/>
    </div>
  )
}
