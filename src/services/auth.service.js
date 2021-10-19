import api from './api';
import TokenService from './token.service';

const login = (email, password) =>
	api
		.post('/auth/sign-in', {
			email,
			password,
		})
		.then((response) => {
			if (response.status === 200) {
				TokenService.setUser({
					...response.data,
					accessToken: response.headers.authorization,
					refreshToken: response.headers['refresh-token'],
				});
			} else {
				return response.errors.messag;
			}
			return 200;
		});

const logout = () => {
	TokenService.removeUser();
};

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

const AuthService = {
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
