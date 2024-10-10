import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { socket } from '../utils/utils';
import { useSelector } from 'react-redux';

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth || {});

  useEffect(() => {
    if (userInfo && userInfo.role === 'vendor') {
      socket.emit('add_vendor', userInfo._id, userInfo);
    } else {
      socket.emit('add_admin', userInfo);
    }
  }, [userInfo]);

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className='ml-0 lg:ml-[270px] pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
