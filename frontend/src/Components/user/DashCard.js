import React from 'react'

export default function DashCard(props) {
    return (
        <div className=' row dashCard mt-3 mb-3 ms-3 me-2  p-3 '>
            <div className=" col-6 dashCard_Detail ">
                <span className='dashboard_number mb-2'>{props.num}</span>
                <span>{props.name}</span>
            </div>
            <div className="col-6 DashCard_pic">
                <img src={props.imgsource} alt="" />
            </div>
            
        </div>
       
        
    )
}
