import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const login = async (inputs) => {
		const response = await axios.post(
			'https://social-media-backend-i91c.onrender.com/api/auth/login',
			inputs,
			{
				withCredentials: true,
			}
		);
		setCurrentUser(response.data);
	};
	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser));
	}, [currentUser]);

	const logout = async (inputs) => {
		await axios.post(
			'https://social-media-backend-i91c.onrender.com/api/auth/logout'
		);
		setCurrentUser(null);
	};
	return (
		<AuthContext.Provider value={{ currentUser, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

//dummy  login function
// const login = () => {
//   setCurrentUser({
//     id: 1,
//     name: 'John Doe',
//     profilePic:
//       'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//   })
// }
