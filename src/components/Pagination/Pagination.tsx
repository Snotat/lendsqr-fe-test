import React, { useEffect } from 'react';
import styles from './Pagination.module.scss';
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push(2);

      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      if (currentPage > 2 && currentPage < totalPages - 1) {
        if (currentPage === 3 && totalPages > maxPagesToShow) {
          pageNumbers.push(3);
        } else if (currentPage > 3) {
          pageNumbers.push(currentPage);
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      if (totalPages - 1 !== 2 && totalPages !== 2) { 
        pageNumbers.push(totalPages - 1);
      }
      pageNumbers.push(totalPages);

      for (let i = 0; i < pageNumbers.length - 1; i++) {
        if (pageNumbers[i] === '...' && pageNumbers[i + 1] === '...') {
          pageNumbers.splice(i, 1);
          i--;
        }
      }

      if (pageNumbers[0] === '...' && pageNumbers.length > 1 && typeof pageNumbers[1] === 'number') {
        pageNumbers.shift();
      }
      if (pageNumbers[pageNumbers.length - 1] === '...' && pageNumbers.length > 1 && typeof pageNumbers[pageNumbers.length - 2] === 'number') {
        pageNumbers.pop();
      }

       const finalPageNumbers: (number | string)[] = [];
       const uniquePages = new Set<number | string>();

       pageNumbers.forEach(item => {
        if (!uniquePages.has(item)) {
          finalPageNumbers.push(item);
          uniquePages.add(item);
        }
       });


      if (totalPages > 6) {
        const arr: (number | string)[] = [];
        arr.push(1);
        arr.push(2);
        arr.push(3);

        if (currentPage < totalPages - 2 && currentPage > 3) {
           arr.push('...');
           arr.push(currentPage);
           arr.push('...');
        } else if (currentPage <= 3) {
          arr.push('...');
        } else {
           arr.push('...');
        }

        arr.push(totalPages - 1);
        arr.push(totalPages);

        let result: (number | string)[] = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '...' && result[result.length - 1] === '...') {
                continue;
            }
            result.push(arr[i]);
        }
        return result;

      }
      return finalPageNumbers;
    }
    return pageNumbers;
  };

  return (
    <div className={styles.paginationContainer}><button className={`${styles.pageButton} ${styles.arrowButton}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LuChevronLeft className={styles.pagination_button}/>
      </button>
      <div className={styles.pageNumbers}>
      {renderPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
            onClick={() => onPageChange(page)}>
            {page}
          </button>
        ) : (
          <span key={index} className={`${styles.pageButton} ${styles.dots}`}>
            {page}
          </span>
        )
      ))}
      </div>
      <button
        className={`${styles.pageButton} ${styles.arrowButton}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
       
        <LuChevronRight className={styles.pagination_button} />
      </button>
    </div>
  );
};

export default Pagination;