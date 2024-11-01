import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import error from '../assets/error.png';
import success from '../assets/success.png';

import {
  active_stripe_connect_account,
  clearMessages,
} from '../store/Reducers/vendorReducer';

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get('activeCode');

  const { successMessage, errorMessage, loader } = useSelector(
    (state) => state.vendors
  );

  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode));
  }, [dispatch, activeCode]);

  const redirect = () => {
    dispatch(clearMessages);
    navigate('/');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src={error} alt='Error img.' />
          <button
            onClick={redirect}
            className='px-5 py-2 bg-green-700 text-white rounded-md'
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <img src={success} alt='Success img.' />{' '}
            <button
              onClick={redirect}
              className='px-5 py-2 bg-green-700 text-white rounded-md'
            >
              Back to Dashboard
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Success;
