import React, { useEffect, useState } from 'react';
import { PiUserCirclePlus } from 'react-icons/pi';
import { FadeLoader, PropagateLoader } from 'react-spinners';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadImage,
  clearMessages,
  addProfileInfo,
} from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
import { overrideStyle } from '../../utils/utils';

const MyProfile = () => {
  const [state, setState] = useState({
    division: '',
    district: '',
    shopName: '',
    sub_district: '',
  });

  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const status = 'active';

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

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      dispatch(uploadImage(formData));
    }
  };

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const addShopInfo = (e) => {
    e.preventDefault();
    dispatch(addProfileInfo(state));
  };

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full md:w-6/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-indigo-100'>
            <div className='flex justify-center items-center py-3'>
              {userInfo?.image ? (
                <label
                  htmlFor='img'
                  className='h-[150px] w-[200px] relative  cursor-pointer   '
                >
                  <img
                    src={userInfo.image}
                    alt="User's profile picture."
                    className='h-[150px] w-[200px]
                    rounded-lg object-cover overflow-hidden'
                  />
                  {loader && (
                    <div className='bg-indigo-300 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20 rounded-lg'>
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  htmlFor='img'
                  className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-indigo-400 border-indigo-300 relative rounded-lg'
                >
                  <span className=''>
                    <PiUserCirclePlus size={35} />
                  </span>
                  <span className=''>Select Image</span>
                  {loader && (
                    <div className='bg-indigo-300 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20 rounded-lg'>
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type='file'
                name='img'
                id='img'
                className='hidden'
              />
            </div>
            <div className='px-0 md:px-5 py-2'>
              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-indigo-800 rounded-lg relative'>
                <span className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-300 absolute right-2 top-2 cursor-pointer'>
                  <FaUserEdit size={24} />
                </span>
                <div className='flex gap-2'>
                  <span className=''>Name:</span>
                  <span className=''>{userInfo.name}</span>
                </div>
                <div className='flex gap-2'>
                  <span className=''>Email:</span>
                  <span className=''>{userInfo.email}</span>
                </div>
                <div className='flex gap-2'>
                  <span className=''>Role:</span>
                  <span className=''>{userInfo.role}</span>
                </div>
                <div className='flex gap-2'>
                  <span className=''>Status:</span>
                  <span className=''>{userInfo.status}</span>
                </div>
                <div className='flex gap-2'>
                  <span className=''>Payment Account:</span>
                  <p>
                    {status === 'active' ? (
                      <span className='py-[6px] px-3 bg-indigo-300 text-indigo-800 rounded-md text-sm cursor-pointer hover:shadow-lg hover:shadow-s/50 hover:text-indigo-600'>
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span className='py-[6px] px-3 bg-indigo-300 text-indigo-800 rounded-md text-sm cursor-pointer hover:shadow-lg hover:shadow-s/50 hover:text-indigo-600'>
                        Activate
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className='px-0 md:px-5 py-2'>
              {!userInfo?.shopInfo ? (
                <form onSubmit={addShopInfo}>
                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='shopName'>Shop name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandler}
                      type='text'
                      name='shopName'
                      id='shopName'
                      placeholder='Shop name'
                      className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                    />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='divisionName'>Division name</label>
                    <input
                      value={state.division}
                      onChange={inputHandler}
                      type='text'
                      name='division'
                      id='divisionName'
                      placeholder='Division name'
                      className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                    />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='districtName'>District name</label>
                    <input
                      value={state.district}
                      onChange={inputHandler}
                      type='text'
                      name='district'
                      id='districtName'
                      placeholder='District name'
                      className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                    />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-2'>
                    <label htmlFor='subDistrict'>Sub District name</label>
                    <input
                      value={state.sub_district}
                      onChange={inputHandler}
                      type='text'
                      name='sub_district'
                      id='subDistrict'
                      placeholder='Sub District name'
                      className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                    />
                  </div>
                  <button
                    disabled={loader}
                    aria-busy={loader}
                    className={`bg-indigo-800 text-white rounded-lg py-2 px-7 my-2 ${
                      loader
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-indigo-400 hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer'
                    }`}
                  >
                    {loader ? (
                      <div className='flex justify-center w-36 items-center'>
                        <PropagateLoader
                          color='#fff'
                          cssOverride={overrideStyle}
                        />
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </form>
              ) : (
                <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-indigo-800 rounded-lg relative'>
                  <span className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-300 absolute right-2 top-2 cursor-pointer'>
                    <FaUserEdit size={24} />
                  </span>
                  <div className='flex gap-2'>
                    <span className=''>Shop Name:</span>
                    <span className=''>{userInfo.shopInfo?.shopName}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span className=''>Division Name:</span>
                    <span className=''>{userInfo.shopInfo?.division}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span className=''>District Name:</span>
                    <span className=''>{userInfo.shopInfo?.district}</span>
                  </div>
                  <div className='flex gap-2'>
                    <span className=''>Sub District:</span>
                    <span className=''>{userInfo.shopInfo?.sub_district}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full md:w-6/12'>
          <div className='w-full pl-0 md:pl-7 mt-6 md:mt-0'>
            <div className=' bg-[#6a5fdf] rounded-md text-indigo-100 p-4'>
              <h2 className='text-lg mb-3 font-semibold'>Change Password</h2>
              <form>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email...'
                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                  />
                </div>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='oldPassword'>Old Password</label>
                  <input
                    type='oldPassword'
                    name='oldPassword'
                    id='oldPassword'
                    placeholder='Old Password...'
                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                  />
                </div>
                <div className='flex flex-col w-full gap-1 mb-2'>
                  <label htmlFor='newPassword'>New Password</label>
                  <input
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    placeholder='New Password...'
                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-lg text-indigo-100'
                  />
                </div>

                <button
                  className='bg-indigo-800
                    hover:bg-indigo-400 hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer  text-white rounded-lg py-2 px-7 my-2'
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
