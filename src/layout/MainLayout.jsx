import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

import { socket } from '../utils/utils';

import { updateCustomers, updateVendors } from '../store/Reducers/chatReducer';

const MainLayout = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth || {});
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.role === 'vendor') {
      socket.emit('add_vendor', userInfo._id, userInfo);
    } else {
      socket.emit('add_admin', userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on('activeVendor', (vendors) => {
      dispatch(updateVendors(vendors));
    });
    socket.on('activeCustomer', (customers) => {
      dispatch(updateCustomers(customers));
    });
  }, [dispatch]);

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
