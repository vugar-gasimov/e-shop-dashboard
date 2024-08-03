import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineList } from 'react-icons/md';

const Header = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className='fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40'>
      <dev className='ml-0  rounded-md h-[65px] flex justify-between items-start bg-[#b1addf] px-5 transition-all'>
        <div
          className='w-[35px] flex lg:hidden'
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span>
            <MdOutlineList />
          </span>
        </div>
        <div className='h-[70px] flex justify-center items-center'>
          <Link className='w-[180px] h-[50px]' to='/'>
            <img
              className='w-full h-full'
              src='http://localhost:3000/images/logo.png'
              alt='Website logo.'
            />
          </Link>
        </div>
      </dev>
    </div>
  );
};

export default Header;
