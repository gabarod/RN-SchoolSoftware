import { useState } from 'react';

const usePaginator = ({ elements, itemsPerPage = 6 }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(elements?.length / itemsPerPage);

	const handlePageChange = page => {
		setCurrentPage(page);
	};

	return { currentPage, totalPages, itemsPerPage, handlePageChange };
};

export default usePaginator;
