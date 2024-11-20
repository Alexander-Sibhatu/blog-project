import React, { useEffect, useState } from 'react'
import { getAllBlogRequest } from '../services/BlogService'
import Blog from './Blog'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])

  const fetchAllBlogs = async () => {
    const response = await getAllBlogRequest();
    setBlogs(response.data)
  }
  useEffect(() => {
    fetchAllBlogs();
  }, [])
  return (
    <div>
      <h3>Blogs</h3>
      {blogs.length>0 &&
      blogs.map((blog) => <Blog key={blog._id} blog={blog}/>) }
    </div>
  )
}

export default Blogs