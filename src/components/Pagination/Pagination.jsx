import css from './Pagination.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbersToShow,
}) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    const half = Math.floor(pageNumbersToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + pageNumbersToShow - 1);
    if (end - start + 1 < pageNumbersToShow) {
      start = Math.max(1, end - pageNumbersToShow + 1);
    }
    return pageNumbers.slice(start - 1, end);
  };

  const handlePageChange = pageNumber => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <ul className={css.wrapper}>
      {visiblePages.map(page => (
        <li
          className={`${css.page} ${page === currentPage ? css.active : ''}`}
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
