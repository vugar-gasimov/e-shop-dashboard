import React, { useState } from 'react';

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md '>
        <div className='flex justify-between items-center'>
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            name=''
            id=''
            className='px-4 py-2 hover:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
          >
            <option value='5' className=''>
              5
            </option>
            <option value='10' className=''>
              10
            </option>
            <option value='20' className=''>
              20
            </option>
          </select>
          <input
            type='text'
            placeholder='Search...'
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]'
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
