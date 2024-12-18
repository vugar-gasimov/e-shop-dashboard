import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdExitToApp, MdOutlineList } from 'react-icons/md';

import { getNav } from '../navigation/index';

import { logout } from '../store/Reducers/authReducer';
import logo from '../assets/logo.png';

const LOGOUT_ICON = <MdExitToApp />;

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      <div
        className={`fixed duration-200 ${
          !showSidebar ? 'invisible' : 'visible'
        } w-screen h-screen bg-[#8cbce780] top-0 left-0 z-10`}
        onClick={() => setShowSidebar(false)}
      ></div>
      <div
        className={`py-5 w-[270px] fixed bg-[#e6e7fb] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? 'left-0' : '-left-[270px] lg:left-0'
        }`}
      >
        <div className='h-[70px] flex justify-center items-center gap-2'>
          {' '}
          <div
            className='w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer'
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <span>
              <MdOutlineList />
            </span>
          </div>
          <Link className='w-[180px] h-[50px]' to='/'>
            <img className='w-full h-full' src={logo} alt='Website logo.' />
          </Link>
        </div>
        <div className='px-[16px]'>
          <ul>
            {allNav.map((nav, num) => (
              <li key={num}>
                <Link
                  to={nav.path}
                  className={`${
                    pathname === nav.path
                      ? 'bg-blue-600 shadow-indigo-500/50 text-white duration-500'
                      : 'text-[#030811] font-bold duration-200'
                  } px-[12px] py-[9px] rounded-lg flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1`}
                >
                  <span>{nav.icon}</span>
                  <span>{nav.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className='text-[#030811] font-bold duration-200
                   px-[12px] py-[9px] rounded-lg flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1'
                type='button'
              >
                <span>{LOGOUT_ICON}</span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
