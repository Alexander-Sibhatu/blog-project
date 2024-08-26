const express = require('express')

const { getAllBlogs, deleteBlog, updateBlog, createBlog, getSingleBlog } = require('../controller/blogController')

const blogRouter = express.Router()


blogRouter.use('/').get(getAllBlogs).post(createBlog)

blogRouter.use('/:id').put(updateBlog).delete(deleteBlog).get(getSingleBlog)

blogRouter.use('*', (req, res, ) => {
    res.send('router not found')
})

module.exports = blogRouter