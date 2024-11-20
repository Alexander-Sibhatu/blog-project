import axios from 'axios';
axios.defaults.withCredentials = true;
const baseUrl = 'http://localhost:8080'


export const registerUser = async (newUser) => {
    const response = await axios.post(`${baseUrl}/api/users/register`, newUser);
    return response.data; // Backend should return a success message
};
export const activateUser = async (token) => {
    const response = await axios.post(`${baseUrl}/api/users/activate/`,  { token });
    return response.data; // Backend should return a success message
};
