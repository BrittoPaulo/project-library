import api from './api';

const getBooks = (params) => api.get('/books', { params });
const getBooksId = (id) => api.get(`/books/${id}`);

const BookService = {
	getBooks,
	getBooksId,
};

export default BookService;
