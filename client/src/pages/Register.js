import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { registerUser } from '../services/UserServices'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }
    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUser = new FormData();

            newUser.append('name', name);
            newUser.append('email', email);
            newUser.append('password', password);
            newUser.append('phone', phone);
            newUser.append('image', image);

            const response = await registerUser(newUser);
            toast.success(response.mesage);

        } catch (error) {
            console.error("Error response", error);
            const errorMessage =  
            error.response?.data?.message || // Top-level message
            error.response?.data?.error?.message || // Nested error.message
            "An error occurred. Please check your activation token.";
            toast.error(errorMessage)
        }
    }
  return (
    <div className='container center'>
        <h2 className='center'>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
                <label form="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className='form-group'>
                <label form="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="form-group">
                <label form="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <div className="form-group">
                <label form="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your phone number"
                    required
                />
            </div>
            <div className="form-group">
                <label form="image">Profile Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
    </div>
  )
}

export default Register