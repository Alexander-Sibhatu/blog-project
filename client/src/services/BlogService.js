import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8080'

export const createBlogService = async (newBlog) => {
    const response =  await axios.post(`${baseUrl}/api/blogs`, newBlog)
    return response.data;
}
export const getAllBlogRequest = async () => {
    const response =  await axios.get(`${baseUrl}/api/blogs`)
    return response.data;
}