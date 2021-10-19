import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/Auth/Login';
import { AuthProvider } from './services/Authentication';
import PrivateRoute from './services/PrivateRoute';

import './App.css';
import Books from './containers/books/Books';

function App() {
	return (
		<AuthProvider>
			<Router>
				<PrivateRoute exact path="/" component={Books} />
				<Route exact path="/login" component={Login} />
			</Router>
		</AuthProvider>
	);
}

export default App;
