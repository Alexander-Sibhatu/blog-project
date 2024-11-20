import axios from 'axios';
const baseUrl = 'http://127.0.0.1:8080'


export const registerUser = async (newUser) => {
    const response = await axios.post(`${baseUrl}/api/users/register`, newUser, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data; // Backend should return a success message
};
