import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Quotes from '../../assets/images/quotes.svg';
import './books.scss';

const Details = ({ book, onClick }) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (book && Object.keys(book).length) {
			setLoading(false);
		}
	}, [book]);
	return (
		<>
			<div className="Book details">
				<button
					type="button"
					onClick={onClick}
					className="btn border-circle close"
				>
					<CloseIcon fontSize="14" color="#333" />
				</button>
				<div className="body scroll">
					{loading ? (
						<div className="div-loader" style={{ width: '100%' }}>
							<div className="loader" />
						</div>
					) : (
						<div className="row">
							<img
								src={book.imageUrl}
								alt={book.title}
								className="book-cover"
							/>
							<div className="column">
								<div className="height">
									<span className="title two-line">{book.title}</span>
									<span className="authors two-line">
										{book.authors.join(',')}
									</span>
								</div>

								<div className="div-info-book">
									<span className="title-info">INFORMAÇÕES</span>
									<div className="line">
										<span className="title-info">Páginas</span>
										<span className="info-book one-line">{`${book.pageCount} páginas`}</span>
									</div>
									<div className="line">
										<span className="title-info">Editora</span>
										<span className="info-book one-line">{`${book.publisher} `}</span>
									</div>
									<div className="line">
										<span className="title-info">Publicação</span>
										<span className="info-book one-line">{`${book.publisher} `}</span>
									</div>
									<div className="line">
										<span className="title-info">Idioma</span>
										<span className="info-book one-line">{`${book.language} `}</span>
									</div>
									<div className="line">
										<span className="title-info">Título Original</span>
										<span className="info-book one-line">{`${book.title} `}</span>
									</div>
									<div className="line">
										<span className="title-info">ISBN-10</span>
										<span className="info-book one-line">{`${book.isbn10}`}</span>
									</div>
									<div className="line">
										<span className="title-info">ISBN-13</span>
										<span className="info-book one-line">{`${book.isbn13} `}</span>
									</div>
								</div>
								<div className="div-info-book" style={{ marginTop: '5%' }}>
									<span className="title-info">RESENHA DA EDITORA</span>
									<div className="line" style={{ marginTop: '5%' }}>
										<img src={Quotes} alt={book.title} className="quotes" />
										<span className="info-book" style={{ textAlign: 'justify' }}>
											{book.description}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default Details;
