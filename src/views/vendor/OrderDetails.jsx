import React from 'react';

const OrderDetails = () => {
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-600'>
        Order Details
      </h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md '>
        <div className='flex justify-end items-center p-4'>
          <select
            name=''
            id=''
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-300 border border-[#6a5fdf]  rounded-lg text-indigo-700'
          >
            <option value=''>pending</option>
            <option value=''>processing</option>
            <option value=''>warehouse</option>
            <option value=''>placed</option>
            <option value=''>cancelled</option>
          </select>
        </div>
        <div className='p-4'>
          <div className='flex gap-2 text-lg text-indigo-100'>
            <h2>#3430</h2>
            <span>3 Jan 2024</span>
          </div>
          <div className='flex flex-wrap'>
            <div className=''>
              <div className='pr-3 text-indigo-100 text-lg'>
                <div className='flex flex-col gap-1'>
                  <h2 className='pb-2 font-semibold'>Deliver to: Warehouse</h2>
                </div>
                <div className='flex justify-start items-center gap-3'>
                  <h2>Payment Status</h2>
                  <span className='text-base'>Paid</span>
                </div>
                <span>Price: $300</span>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100 px-2'>
                    <div className='flex gap-3 text-md items-center'>
                      <img
                        src='http://localhost:3000/images/category/1.jpg'
                        alt='Product image.'
                        className='w-[50px] h-[50px] rounded-lg'
                      />
                      <div>
                        <h3>Product name here</h3>
                        <p>
                          <span>Brand: </span>
                          <span>Easy </span>
                          <span className='text-lg'>Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100'>
                    <div className='flex gap-3 text-md items-center'>
                      <img
                        src='http://localhost:3000/images/category/1.jpg'
                        alt='Product image.'
                        className='w-[50px] h-[50px] rounded-lg'
                      />
                      <div>
                        <h3>Product name here</h3>
                        <p>
                          <span>Brand: </span>
                          <span>Easy </span>
                          <span className='text-lg'>Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100'>
                    <div className='flex gap-3 text-md items-center'>
                      <img
                        src='http://localhost:3000/images/category/1.jpg'
                        alt='Product image.'
                        className='w-[50px] h-[50px] rounded-lg'
                      />
                      <div>
                        <h3>Product name here</h3>
                        <p>
                          <span>Brand: </span>
                          <span>Easy </span>
                          <span className='text-lg'>Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
