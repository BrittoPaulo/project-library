const getLocalRefreshToken = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return user?.refreshToken;
};

const getLocalAccessToken = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return user?.accessToken;
};

const updateLocalAccessToken = (response) => {
	const user = JSON.parse(localStorage.getItem('user'));
	user.accessToken = response.accessToken;
	user.refreshToken = response.refreshToken;
	localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => JSON.parse(localStorage.getItem('user'));

const setUser = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
	localStorage.removeItem('user');
	window.location.reload();
};

const TokenService = {
	getLocalRefreshToken,
	getLocalAccessToken,
	updateLocalAccessToken,
	getUser,
	setUser,
	removeUser,
};

export default TokenService;
