import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './../Layout/NavBar';
import Home from '../pages/Home';
import Register from '../pages/Register';
import CreateBlog from '../pages/CreateBlog';
import Blogs from '../pages/Blogs';
import Login from '../pages/Login';
import Activate from '../pages/Activate';

const Index = () => {
  return (
    <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
            <Route path= '/' element={ <Home />}/>
            <Route path= '/blogs' element={ <Blogs />}/>
            <Route path= '/create-blog' element={ <CreateBlog />}/>
            <Route path= '/register' element={ <Register />}/>
            <Route path= '/login' element={ <Login />}/>
            <Route path= '/api/users/activate/:token' element={ <Activate />}/>
        </Routes>
    </Router>
  )
}

export default Index