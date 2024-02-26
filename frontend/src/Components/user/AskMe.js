import React from 'react'
import { FaLocationArrow } from "react-icons/fa";

export default function AskMe() {
  return (
    <div>
      <div className="categoryContainer ">
        <div className="inner m-5 p-2 mt-3 pt-2 ">
          <h1>Ask your queries here</h1>
        </div>
        <div className="inner m-5 p-2 mt-3 pt-2 ">
          <div className=" col-10 justify-content-evenly answer_div">
            this is answer div
          </div>
        <div className="chatbot sticky-bottom fixed-bottom">
          <form action="">
            <div className="row">
              <div className="col-10">
                <input type="text" className='chatinput' placeholder='Enter your Questions' />
              </div>
              <div className="col-2 chat_div">
                <button type='submit' className='chatbtn'><FaLocationArrow style={{fontSize: "22px"}}/></button>
              </div>
            </div>


          </form>
        </div>
        </div>
      </div>
    </div>
  )
}
