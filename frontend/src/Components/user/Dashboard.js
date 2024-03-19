import React from 'react'
import DashCard from './DashCard'

export default function Dashboard() {
  return (
    <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Pending Offers' imgsource={require('../../assets/images/clock.png')}/>
     <DashCard name='completed Orders' imgsource={require('../../assets/images/completed-task.png')}/>
     <DashCard  name='items in Cart' imgsource={require('../../assets/images/trolley.png')}/>
     <DashCard name='Pending orders' imgsource={require('../../assets/images/cargo.png')}/>
    </div>
  )
}
