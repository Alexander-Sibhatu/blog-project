const { successHandler } = require("./requestHandler")

const getAllBlogs = async (req, res, next) => {
    try {
        successHandler(res, 200, 'Return all blogs')
    } catch (error) {
        next(error)
    }
}
const createBlog = async (req, res, next) => {
    try {
        successHandler(res, 200, 'Blog created')
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