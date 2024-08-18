import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import {
  vendor_register,
  clearMessages,
} from '../../store/Reducers/authReducer';

import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();

  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    name: '',
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
    dispatch(vendor_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  return (
    <div className=' min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className='w-[350px] text-[#fff] p-2 '>
        <div className='bg-[#6f68d1] p-4 rounded-md shadow-lg'>
          <h1 className='text-xl mb-3 font-bold text-center'>
            Welcome to Easy Shop
          </h1>
          <p className='text-sm mb-3 font-medium text-gray-200 text-center'>
            Please fill in the information below to create your account.
          </p>
          <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-2'>
              <label
                className='block text-gray-300 text-sm font-bold mb-1'
                htmlFor='name'
              >
                Name
              </label>
              <input
                onChange={inputHandler}
                value={state.name}
                className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline border-slate-400 bg-transparent'
                type='text'
                name='name'
                id='name'
                placeholder='Enter your name'
                required
              />
            </div>
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
            <div className='flex items-center w-full gap-3 mb-2'>
              <input
                className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500'
                type='checkbox'
                name='checkbox'
                id='checkbox'
              />
              <label className=' text-gray-200 text-sm ml-2' htmlFor='checkbox'>
                I agree to the{' '}
                <a href='/terms' className='text-blue-300 hover:underline'>
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className='flex items-center justify-between'>
              <button
                disabled={loader ? true : false}
                className='bg-slate-800 w-full hover:bg-slate-600 hover:shadow-lg text-white hover:text-slate-100 font-bold py-2 px-7 mb-3 rounded-md focus:outline-none focus:shadow-outline'
                type='submit'
              >
                {loader ? (
                  <PropagateLoader
                    color='#D1D5DB'
                    cssOverride={overrideStyle}
                  />
                ) : (
                  'Register'
                )}
              </button>
            </div>
            <div className='flex items-center mb-2 gap-3 justify-center'>
              <p className='text-center text-gray-200'>
                Already have an account?{' '}
                <Link to='/login' className='text-blue-300 hover:underline'>
                  Login
                </Link>
              </p>
            </div>
            <div className='w-full flex justify-center items-center mb-2'>
              <div className='w-[45%] h-1 bg-slate-700 rounded'></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] h-1 bg-slate-700 rounded'></div>
            </div>

            <div className='flex justify-center items-center gap-3'>
              <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span className=''>
                  <FaGoogle />
                </span>
              </div>
              <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                <span className=''>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
