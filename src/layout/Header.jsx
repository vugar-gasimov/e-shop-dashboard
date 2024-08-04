import React from 'react';

import { MdOutlineList } from 'react-icons/md';

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className='fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40'>
      <dev className='ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all'>
        <div
          className='w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer'
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span>
            <MdOutlineList />
          </span>
        </div>
        <div className='hidden md:block'>
          <input
            className='px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#423d72] focus:border-indigo-500 overflow-hidden'
            type='text'
            name='search'
            id='search'
            placeholder='Search...'
          />
        </div>
      </dev>
    </div>
  );
};

export default Header;
