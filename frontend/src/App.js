import React from 'react';
import './Styles/App.css'
import { Route, Routes } from 'react-router-dom';
import User from './Pages/User';
import Vendor from './Pages/Vendor';
// import Admin from './Pages/Admin';
import LoginPage from './Pages/LoginPage';
// import axios from 'axios';
import SignUpUser from './Pages/SignUpUser';
import SignUpVendor from './Pages/SignUpVendor';

// axios.default.baseURL =  'http://localhost:8000'
// axios.deafults.withCredentials = true;


function App() {
 
  return (
   <div>
    <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup/user" element={<SignUpUser />} />
    <Route path="/signup/vendor" element={<SignUpVendor />} />


    <Route path="/user" element={<User />} />
    <Route path="/vendor" element={<Vendor />} />
    {/* <Route path="/admin" element={<Admin />} /> */}

    </Routes>
   </div>
  )
}


export default App;
