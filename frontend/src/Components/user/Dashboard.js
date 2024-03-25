import React from 'react'
import DashCard from './DashCard'

export default function Dashboard() {
  return (
    <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Pending Offers' imgsource={require('../../assets/images/User/clock.png')}/>
     <DashCard name='completed Orders' imgsource={require('../../assets/images/User/completed-task.png')}/>
     <DashCard  name='items in Cart' imgsource={require('../../assets/images/User/trolley.png')}/>
     <DashCard name='Pending orders' imgsource={require('../../assets/images/User/cargo.png')}/>
    </div>
  )
}
