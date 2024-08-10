import React from 'react';

const VendorDetails = () => {
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Vendor Details</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-indigo-200'>
          <div className='w-3/12 flex justify-center items-center py-3'>
            <div className=''>
              <img
                className='w-full h-[230px] rounded-lg'
                src='http://localhost:3000/images/demo.jpg'
                alt="Vendor's image."
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
                  <span>Name :</span>
                  <span>V.Gasimov</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Email :</span>
                  <span>V.Gasimov</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Role :</span>
                  <span>Vendor</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Status :</span>
                  <span>Active</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Payment Status :</span>
                  <span>Active</span>
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
                  <span>Shop name :</span>
                  <span>Easy Shop</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>Division</span>
                  <span>V.Gasimov</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>District :</span>
                  <span>Vendor</span>
                </div>
                <div className='flex gap-2 font-bold text-indigo-800'>
                  <span>State :</span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <form action=''>
            <div className='flex gap-4 py-3'>
              <select
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-indigo-200'
                name=''
                id=''
              >
                <option value=''>--Select Status--</option>
                <option value='active'>Active</option>
                <option value='deactivate'>Deactivate</option>
              </select>
              <button
                className='bg-indigo-600
                    hover:bg-indigo-400  hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer  text-white rounded-lg py-2 px-12 '
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
