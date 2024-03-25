import React from 'react'
import DashCard from '../user/DashCard'
export default function DashboardV() {
  return (
    <div className='categoryContainer d-flex dashboard_container'>
     <DashCard name='Total Products' imgsource={require('../../assets/images/Vendor/cost.png')}/>
     <DashCard name='Pending Offers' imgsource={require('../../assets/images/Vendor/time-managament.png')}/>
     <DashCard  name='Sold Products' imgsource={require('../../assets/images/Vendor/sold-out.png')}/>
     <DashCard name='Total Revenue' imgsource={require('../../assets/images/Vendor/growth.png')}/>
    </div>
  )
}
