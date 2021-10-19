import React, { useEffect, useContext, useState } from 'react';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import BookService from '../../services/book.service';
import './Book.scss';
import Header from '../../components/books/Header';
import Card from '../../components/books/Card';
import { AuthContext } from '../../services/Authentication';
import AuthService from '../../services/auth.service';
import useWindowDimensions from '../../utils/useWindowDImensions';
import Details from '../../components/books/Details';

const Books = () => {
	const { currentUser } = useContext(AuthContext);
	const { height } = useWindowDimensions();
	const [books, setBooks] = useState([]);
	const [book, setBook] = useState([]);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [idOpen, setIdOpen] = useState(null);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState({
		totalPage: 1,
		totalItems: 500,
	});

	const countPage = (sum) => {
		const currentValue = page + sum;
		if (!(currentValue < 1 || currentValue > total.totalPage)) {
			setPage(currentValue);
		}
	};
	const openModal = (event, id) => {
		event.stopPropagation();
		setIdOpen(id);
		setVisible(true);
	};
	const closeModal = (event) => {
		event.stopPropagation();
		setIdOpen('');
		setVisible(false);
	};
	const getOut = async (event) => {
		event.stopPropagation();
		AuthService.logout();
		window.location.reload();
	};
	useEffect(() => {
		if (visible && idOpen) {
			BookService.getBooksId(idOpen)
				.then((res) => {
					if (res.status === 200) {
						setBook(res.data);
					}
				})
		}
	}, [visible, idOpen]);

	useEffect(() => {
		setLoading(true);
		BookService.getBooks({ page, amount: 25 })
			.then((res) => {
				if (res.status === 200) {
					setBooks(res.data.data);
					setTotal({
						totalPage: res.data.totalPages,
						totalItems: res.data.totalItems,
					});
				}
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, [page]);

	return (
		<>
			<div
				className="Book backgroundImage backgroundImageBook"
				style={{ height, overflow: visible ? 'hidden' : 'auto' }}
			>
				<Header name={currentUser.name} onClick={getOut} />
				{loading ? (
					<div className="div-loader">
						<div className="loader" />
					</div>
				) : (
					<div className="Card-list">
						{books.map((item) => (
							<Card key={item.id} item={item} onClick={openModal} />
						))}
					</div>
				)}
				
				<div className="row-button">
					<span className="page">
						Página <strong>{page}</strong> de <strong>{total.totalPage}</strong>
					</span>
					<button
						onClick={(e) => {
							e.stopPropagation();
							countPage(-1);
						}}
						type="button"
						className="btn border-circle"
					>
						<ArrowForwardIosOutlinedIcon
							fontSize="14"
							color={`${page === 1 ? 'disabled' : '#333'}`}
						/>
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							countPage(1);
						}}
						type="button"
						className="btn border-circle"
					>
						<ArrowBackIosNewOutlinedIcon
							fontSize="14"
							color={`${page === total.totalPage ? 'disabled' : '#333'}`}
						/>
					</button>
				</div>
			</div>
			{visible && <Details book={book} onClick={closeModal} />}
		</>
	);
};

export default Books;
