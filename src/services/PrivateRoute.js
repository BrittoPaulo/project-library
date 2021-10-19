import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './Authentication';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				!(currentUser && Object.keys(currentUser).length) ? <Redirect to="/login" /> : <RouteComponent {...routeProps} />
			}
		/>
	);
};

export default PrivateRoute;
