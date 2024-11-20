import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='nav'>
        <Link to='/' className='nav_link'>Home</Link>
        <Link to='/blogs' className='nav_link'>Blogs</Link>
        <Link to='/create-blog' className='nav_link'>Create Blog</Link>
        <Link to='/register' className='nav_link'>Register</Link>
        <Link to='/login' className='nav_link'>Login</Link>
    </nav>
  )
}

export default NavBar