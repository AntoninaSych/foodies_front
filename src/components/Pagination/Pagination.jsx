import clsx from 'clsx';
import { NUMBER_PAGES_TO_SHOW } from '../../const';
import css from './Pagination.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageNumbersToShow = NUMBER_PAGES_TO_SHOW,
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
    <div className={css.wrapper}>
      <ul className={css.list}>
        {visiblePages.map(page => (
          <li
            className={clsx(css.listItem, {
              [css.active]: page === currentPage,
            })}
            key={`${page}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
