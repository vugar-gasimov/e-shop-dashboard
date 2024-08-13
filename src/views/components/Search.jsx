import React from 'react';

const Search = ({ setPerPage, setSearchValue, searchValue }) => {
  return (
    <div className='flex justify-between items-center'>
      <select
        onChange={(e) => setPerPage(parseInt(e.target.value))}
        name=''
        id=''
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6]'
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
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type='text'
        placeholder='Search...'
        className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6]'
      />
    </div>
  );
};

export default Search;
