import React, { useEffect, useState } from 'react';
import AuthService from './auth.service';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
	useEffect(() => {
		setCurrentUser(AuthService.getCurrentUser())
	},[]);
	return (
		<AuthContext.Provider
			value={{
				currentUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
