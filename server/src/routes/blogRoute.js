const express = require('express')

const { getAllBlogs, deleteBlog, updateBlog, createBlog, getSingleBlog } = require('../controller/blogController')
const upload = require('../middleware/fileUpload')

const blogRouter = express.Router()


blogRouter.route('/')
    .get(getAllBlogs)
    .post(upload.single('image'), createBlog)

blogRouter.route('/:id')
    .put(updateBlog)
    .delete(deleteBlog)
    .get(getSingleBlog)

blogRouter.route('*', (req, res, ) => {
    res.send('router not found')
})

module.exports = blogRouter