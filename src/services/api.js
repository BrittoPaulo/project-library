import axios from 'axios';
import TokenService from './token.service';

const environment = process.env.REACT_APP_ENVIRONMENT;
const instance = axios.create({
	baseURL: environment,
	headers: {
		'Content-Type': 'application/json',
	},
});

instance.interceptors.request.use(
	(config) => {
		const token = TokenService.getLocalAccessToken();
		if (token) {
			config.headers.authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

instance.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalConfig = err.config;

		if (originalConfig.url !== '/auth/sign-in' && err.response) {
			if (err.response.status === 401 && !originalConfig.retry) {
				originalConfig.retry = true;

				try {
					const rs = await instance.post('/auth/refresh-token', {
						refreshToken: TokenService.getLocalRefreshToken(),
					});
					TokenService.updateLocalAccessToken({
						accessToken: rs.headers.authorization,
						refreshToken: rs.headers['refresh-token'],
					});

					return instance(originalConfig);
				} catch (_error) {
					TokenService.removeUser();

					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export default instance;
