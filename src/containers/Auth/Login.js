import React, { useState, useContext } from 'react';
import './Login.scss';
import '../../App.css';
import { styled } from '@mui/material/styles';
import {
	FormControl,
	FilledInput,
	InputLabel,
	InputAdornment,
	Button,
} from '@mui/material';
import { Redirect } from 'react-router';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AuthService from '../../services/auth.service';
import logo from '../../assets/images/logo.svg';
import { AuthContext } from '../../services/Authentication';

const MessageErro = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		background: 'rgba(255, 255, 255, 0.4)',
		color: '#fff',
		boxShadow: theme.shadows[1],
		fontSize: 16,
		heigth: 200,
		padding: 20,
		borderRadius: 4,
	},
	[`& .${tooltipClasses.arrow}`]: {
		color: 'rgba(255, 255, 255, 0.4)',
		transform: 'translate3d(5px, 0.5px, 0px) !important',
	},
}));

const Login = () => {
	const { currentUser } = useContext(AuthContext);
	const [submit, setSubmit] = useState(false);
	const [openTooltip, setOpenTooltip] = useState(false);
	const [messageValidate, setMessageValidate] = useState('');
	if (currentUser) {
		return <Redirect to="/" />;
	}
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (event) => {
		event.stopPropagation();
		setSubmit(true);
		await AuthService.login(values.email, values.password)
			.then((result) => {
				setSubmit(false);
				if (result !== 200) {
					setOpenTooltip(true);
					setMessageValidate(result);
					return;
				}
				setOpenTooltip(false);
				setSubmit(false);
				window.location.reload();
			})
			.catch(() => {
				setOpenTooltip(true);
				setMessageValidate('Erro ao realizar login');
				setSubmit(false);
			});
	};

	return (
		<div className="login-page backgroundImage backgroundImageLogin">
			<div className="container">
				<div className="row">
					<img src={logo} alt="logo" />
					<span className="title">Books</span>
				</div>
				<div className="column">
					<FormControl sx={{ m: 1, width: '300px' }} variant="filled">
						<InputLabel className="InputLabel" focused={false}>
							E-mail
						</InputLabel>
						<FilledInput
							id="outlined-adornment-password"
							type="text"
							value={values.email}
							className="input"
							onChange={(e) => {
								setOpenTooltip(false);
								setValues({
									...values,
									email: e.target.value,
								});
							}}
							label="text"
						/>
					</FormControl>
					<MessageErro
						open={openTooltip}
						title={messageValidate}
						arrow
						placement="bottom-start"
					>
						<FormControl sx={{ m: 1, width: '300px' }} variant="filled">
							<InputLabel className="InputLabel" focused={false}>
								Password
							</InputLabel>
							<FilledInput
								id="outlined-adornment-password"
								type="password"
								value={values.password}
								className="input"
								onChange={(e) => {
									setOpenTooltip(false);

									setValues({
										...values,
										password: e.target.value,
									});
								}}
								endAdornment={
									<InputAdornment position="end">
										{submit ? (
											<div className="loader" />
										) : (
											<Button
												variant="contained"
												className="button"
												onClick={handleSubmit}
												disabled={!(values.password && values.email)}
											>
												Entrar
											</Button>
										)}
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
					</MessageErro>
				</div>
			</div>
		</div>
	);
};

export default Login;
