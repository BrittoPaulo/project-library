import React from 'react';
import logo from '../../assets/images/logo.svg';
import logOut from '../../assets/images/logOut.svg';
import './books.scss';

const Header = ({ name, onClick }) => (
	<div className="container">
		<div className="row">
			<img src={logo} alt="logo" className="img"/>
			<span className="title">Books</span>
		</div>
		<div className="row">
			<span className="user">
				Bem vindo, <strong>{name}</strong>
			</span>
			<button onClick={onClick} type="button" className="btn">
				<img src={logOut} alt="logo" className="ImgOut" />
			</button>
		</div>
	</div>
);

export default Header;
