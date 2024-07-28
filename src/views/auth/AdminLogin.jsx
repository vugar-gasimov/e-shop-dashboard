import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { admin_login } from '../../store/Reducers/authReducer';

const AdminLogin = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  return (
    <div className=' min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#fff] p-2 '>
        <div className='bg-[#6f68d1] p-4 rounded-md shadow-lg'>
          <div className='h-[70px] flex justify-center items-center'>
            <div className='w-[180px] h-[50px]'>
              <img
                className='w-full h-full'
                src='http://localhost:3000/images/logo.png'
                alt='Website logo.'
              />
            </div>
          </div>
          <h1 className='text-xl mb-3 font-bold text-center'>
            Welcome Back to Easy Shop
          </h1>
          <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label
                className='block text-gray-300 text-sm font-bold mb-1'
                htmlFor='email'
              >
                Email Address
              </label>
              <input
                onChange={inputHandler}
                value={state.email}
                className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border-slate-400 bg-transparent'
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label
                className='block text-gray-300 text-sm font-bold mb-1'
                htmlFor='password'
              >
                Password
              </label>
              <input
                onChange={inputHandler}
                value={state.password}
                className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border-slate-400 bg-transparent'
                type='password'
                name='password'
                id='password'
                placeholder='Enter your password'
                required
              />
            </div>

            <div className='flex items-center justify-between'>
              <button
                className='bg-slate-800 w-full hover:bg-slate-600 hover:shadow-lg text-white hover:text-slate-100 font-bold py-2 px-7 mb-3 rounded-md focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Login
              </button>
            </div>

            <div className='w-full flex justify-center items-center mb-2'>
              <div className='w-[90%] h-1 bg-slate-700 rounded'></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
