import axios from 'axios';

export const makeRequest = axios.create({
	baseURL: 'https://social-media-backend-i91c.onrender.com/api/',
	withCredentials: true,
});
