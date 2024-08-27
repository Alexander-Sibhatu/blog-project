const createError = require('http-errors')
const slugify = require('slugify')
const { successHandler } = require("./requestHandler")
const Blog = require('../models/blogModel')

const getAllBlogs = async (req, res, next) => {
    try {
        successHandler(res, 200, 'Return all blogs')
    } catch (error) {
        next(error)
    }
}
const createBlog = async (req, res, next) => {
    try {
        
        //step 1: get the data from req
        const { title, description } = req.body;

        if(!title || !description)
            throw createError(404, 'title or description is missing')

        if(title.length < 3)
            throw createError(404, 'title length should be at least 3 characters')

        const image = req.file;
        if(image && image.size > 1024 * 1024 * 1)
            throw createError(400, 'File size is too large, It must be less that 1mb')

        //step 3: check the user already exists or not
        const blog = await Blog.findOne({ title });
        if(blog)
            throw createError(400, 'Blog with this title already exists.');

        const newBlog = new Blog({
            title: title,
            slug: slugify(title),
            description: description,
            image: image.path,
        })


        return successHandler(res, 200, 'Blog was created successfully', newBlog)

    } catch (error) {
        next(error)
    }
}
const deleteBlog = async (req, res, next) => {
    try {
        successHandler(res, 200, 'blog deleted')
    } catch (error) {
        next(error)
    }
}
const updateBlog = async (req, res, next) => {
    try {
        successHandler(res, 200, 'Blog updated')
    } catch (error) {
        next(error)
    }
}
const getSingleBlog = async (req, res, next) => {
    try {
        successHandler(res, 200, 'single blog returned')
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllBlogs, deleteBlog, createBlog, updateBlog, getSingleBlog }