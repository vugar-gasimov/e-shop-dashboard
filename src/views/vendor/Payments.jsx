import React, { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { MdOutlineCurrencyExchange } from 'react-icons/md';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const Row = ({ index, style }) => {
    return (
      <div style={style} className='flex text-sm'>
        <div className='w-[25%] py-2 px-3 whitespace-nowrap text-indigo-200'>
          {index + 1}
        </div>
        <div className='w-[25%] py-2 px-3 whitespace-nowrap text-indigo-200'>
          {' '}
          $350
        </div>
        <div className='w-[25%] py-2 px-3 whitespace-nowrap'>
          <span className='py-[6px] px-3 bg-indigo-300 text-indigo-800 rounded-md text-sm'>
            Pending
          </span>
        </div>
        <div className='w-[25%] py-2 px-3 whitespace-nowrap text-indigo-200'>
          15 Aug 2024
        </div>
      </div>
    );
  };
  return (
    <div className='px-2 md:px-7 py-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5'>
        <div className='flex justify-between items-center p-5 bg-[#6a5fdf] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-indigo-100'>
            <h2 className='text-3xl font-bold'>$36</h2>
            <span className='text-md font-medium'>Total Sale</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#6a5fdf] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-indigo-100'>
            <h2 className='text-3xl font-bold'>$150</h2>
            <span className='text-md font-medium'>Available Amount</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange
              className='text-[#fae8e8]
            shadow-lg'
            />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#6a5fdf] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-indigo-100'>
            <h2 className='text-3xl font-bold'>$100</h2>
            <span className='text-md font-medium'>Withdrawable Amount</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange className='text-[#fae8e8] shadow-lg' />{' '}
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#6a5fdf] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-indigo-100'>
            <h2 className='text-3xl font-bold'>$0</h2>
            <span className='text-md font-medium'>Pending Amount</span>
          </div>
          <div className='w-[40px] h-[47px] rounded-full bg-indigo-400 flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4'>
        <div className='bg-[#6a5fdf] text-indigo-100 rounded-lg p-5'>
          <h2 className='text-lg'>Send Request</h2>
          <div className='pt-5 mb-5'>
            <form>
              <div className='flex gap-3 '>
                <input
                  min={0}
                  type='number'
                  name='amount'
                  id='amount'
                  className='px-3 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6] md:w-[75%]'
                />
                <button
                  className='bg-indigo-600
                    hover:bg-indigo-400 hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer  text-white rounded-lg py-2 px-7 '
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className=''>
            <h2 className='text-lg pb-4'>Pending Request</h2>
            <div className='w-full overflow-x-auto'>
              <div className='flex bg-[#a7a3de] uppercase text-xs min-w-[340px] rounded-lg'>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  No
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Amount
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Status
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Date
                </div>
              </div>
              {
                <List
                  style={{ minWidth: '340px' }}
                  className='List'
                  height={350}
                  itemCount={100}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        <div className='bg-[#6a5fdf] text-indigo-100 rounded-lg p-5'>
          <div>
            <h2 className='text-lg pb-4'>Successful Withdrawals</h2>
            <div className='w-full overflow-x-auto'>
              <div className='flex bg-[#a7a3de] uppercase text-xs min-w-[340px] rounded-lg'>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  No
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Amount
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Status
                </div>
                <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                  Date
                </div>
              </div>
              {
                <List
                  style={{ minWidth: '340px' }}
                  className='List'
                  height={350}
                  itemCount={100}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
