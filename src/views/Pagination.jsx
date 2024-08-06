import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);
  let startPage = pageNumber;

  let difference = totalPage - pageNumber;
  if (difference <= showItem) {
    startPage = totalPage - showItem;
  }
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) {
    startPage = 1;
  }
  const createBton = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? 'bg-indigo-400 shadow-lg shadow-indigo-300/50 text-indigo-800'
              : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-indigo-800 text-[#d0d2d6]'
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };
  return (
    <ul className='flex gap-2'>
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-indigo-600 text-[#d0d2d6] cursor-pointer hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-indigo-800'
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBton()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className='w-[33px] h-[33px] rounded-full flex justify-center items-center bg-indigo-600 text-[#d0d2d6] cursor-pointer hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 hover:text-indigo-800'
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
