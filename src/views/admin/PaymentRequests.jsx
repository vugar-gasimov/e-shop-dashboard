import React, { forwardRef } from 'react';
import { FixedSizeList as List } from 'react-window';

function handleOnWheel({ deltaY }) {
  console.log('handleOnWheel', deltaY);
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequests = () => {
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
        <div className='w-[25%] py-0 px-3  whitespace-nowrap'>
          <button
            type='button'
            className='bg-indigo-600
                    hover:bg-indigo-400hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer text-indigo-200 rounded-lg py-[6px] px-3 '
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <h2 className='text-xl font-medium pb-5 text-indigo-200'>
          Withdrawal Requests
        </h2>
        <div className='w-full'>
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
              <div className='w-[25%] px-3 py-2 font-bold text-indigo-700'>
                Action
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
  );
};

export default PaymentRequests;
