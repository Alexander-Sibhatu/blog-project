import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createBlogService } from '../services/BlogService';

const CreateBlog = () => {

    // blog will take title, description, and an image
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newBlog = new FormData()
            newBlog.append('title', title)
            newBlog.append('description', description)
            newBlog.append('image', image)

            const response = await createBlogService(newBlog)
            toast(response.message)

            if(response && response.data) {
                setTitle('');
                setDescription('');
                setImage('');
            } else {
                throw new Error("Unexpected response format from server")
            }
        

        } catch (error) {
            toast(error.response.data.error.message)
        }
    }

  return (
    <article>
        <h2>Create a blog</h2>
        {image && (
            <div>
                <img 
                    className='user-image'
                    src={URL.createObjectURL(image)}
                    alt='user'
                />
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    name='title' 
                    id='title' 
                    value={title} 
                    onChange={handleTitle}
                    required
                />
            </div>
            <div className="form-control">
                <label htmlFor="image">upload Image:</label>
                <input 
                    type="file" 
                    name='image' 
                    onChange={handleImage}
                    accept='image/*'
                    required 
                />
            </div>
            <div className="form-control">
                <label htmlFor="description">Description:</label>
                <textarea 
                    type="text" 
                    name='description' 
                    id='description' 
                    value={description} 
                    onChange={handleDescription}
                    required
                />
            </div>
            <button>create blog</button>
        </form>
    </article>
  )
}

export default CreateBlog