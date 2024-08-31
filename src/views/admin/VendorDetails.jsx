import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getVendor,
  updateVendorStatus,
  clearMessages,
} from './../../store/Reducers/vendorReducer';
import { useParams } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';

const VendorDetails = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, vendor } = useSelector(
    (state) => state.vendors
  );
  const [status, setStatus] = useState('');

  const { vendorId } = useParams();

  useEffect(() => {
    dispatch(getVendor(vendorId));
  }, [dispatch, vendorId]);

  const defaultShopInfo = {
    shopName: 'N/A',
    division: 'Unknown Division',
    district: 'Unknown District',
    sub_district: 'Unknown State',
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status) {
      dispatch(updateVendorStatus({ vendorId, status }));
    }
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

  useEffect(() => {
    if (vendor) {
      setStatus(vendor.status);
    }
  }, [vendor]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Vendor Details</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-indigo-200'>
          <div className='w-3/12 flex justify-center items-center py-3'>
            <div className=' '>
              <img
                className='w-full h-[230px] rounded-lg object-cover shadow-md'
                src={
                  vendor?.image
                    ? vendor.image
                    : 'http://localhost:3000/images/default-profile-picture-png.png'
                }
                alt={`Profile img of ${vendor?.name || 'vendor'}`}
              />
            </div>
          </div>
          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2 className=''>Basic Info</h2>
              </div>

              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-indigo-300 rounded-md'>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Name:</span>
                  <span>{vendor?.name}</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Email:</span>
                  <span>{vendor?.email}</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Role:</span>
                  <span>{vendor?.role}</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Status:</span>
                  <span>{vendor?.status}</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Payment Status:</span>
                  <span>{vendor?.payment}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2 className=''>Address</h2>
              </div>

              <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-indigo-300 rounded-md'>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Shop name:</span>
                  <span>
                    {vendor?.shopInfo?.shopName || defaultShopInfo.shopName}
                  </span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Division:</span>
                  <span>
                    {vendor?.shopInfo?.division || defaultShopInfo.division}
                  </span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>District:</span>
                  <span>
                    {vendor?.shopInfo?.district || defaultShopInfo.district}
                  </span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>State:</span>
                  <span>
                    {vendor?.shopInfo?.sub_district ||
                      defaultShopInfo.sub_district}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <form action='' onSubmit={handleSubmit}>
            <div className='flex gap-4 py-3'>
              <select
                name='status'
                id='status'
                required
                value={status}
                onChange={handleStatusChange}
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-indigo-200'
              >
                <option value=''>--Select Status--</option>
                <option value='active'>Active</option>
                <option value='deactivate'>Deactivate</option>
              </select>
              <button
                type='submit'
                disabled={loader}
                aria-busy={loader}
                className={`bg-indigo-600 text-white rounded-lg py-2 px-7  font-bold  ${
                  loader
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-indigo-400 hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer'
                }`}
              >
                {loader ? (
                  <div className='flex justify-center w-36 items-center'>
                    <PropagateLoader color='#fff' cssOverride={overrideStyle} />
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
