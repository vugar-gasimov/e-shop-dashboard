import React, { useState } from 'react';
import { MdOutlineClose, MdOutlineList } from 'react-icons/md';

const ChatCustomer = () => {
  const [show, setShow] = useState(false);
  const vendorId = 65;

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? '-left-[16px]' : '-left-[336px]'
            } md:left-0 md:relative transition-all`}
          >
            <div className='w-full h-[calc(100vh-177px)] bg-indigo-800 md:bg-transparent overflow-y-auto rounded-lg'>
              <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-indigo-100'>
                <h1 className=''>Customers</h1>
                <span
                  onClick={() => setShow(!show)}
                  className='block cursor-pointer md:hidden'
                >
                  <MdOutlineClose />
                </span>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-indigo-100 px-2 py-2 cursor-pointer bg-indigo-400 rounded-lg `}
              >
                <div className='relative'>
                  <img
                    src='http://localhost:3000/images/admin.jpg'
                    alt="Vendor's profile picture."
                    className='w-[38px] h-[38px] border-indigo-300 border-2 max-w-[38px] p-[2px] rounded-full'
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>
                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>V.Gasimov</h2>
                  </div>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-indigo-100 px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className='relative'>
                  <img
                    src='http://localhost:3000/images/admin.jpg'
                    alt="Vendor's profile picture."
                    className='w-[38px] h-[38px] border-indigo-300 border-2 max-w-[38px] p-[2px] rounded-full'
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>
                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>S.Jhony</h2>
                  </div>
                </div>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-indigo-100 px-2 py-2 rounded-sm cursor-pointer`}
              >
                <div className='relative'>
                  <img
                    src='http://localhost:3000/images/admin.jpg'
                    alt="Vendor's profile picture."
                    className='w-[38px] h-[38px] border-indigo-300 border-2 max-w-[38px] p-[2px] rounded-full'
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>
                <div className='flex justify-center items-start flex-col w-full'>
                  <div className='flex justify-between items-center w-full'>
                    <h2 className='text-base font-semibold'>T.Bruce</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <div className='flex justify-between items-center'>
              {vendorId && (
                <div className='flex justify-start gap-3 items-center'>
                  <div className='relative'>
                    <img
                      src='http://localhost:3000/images/demo.jpg'
                      alt="Vendor's profile picture."
                      className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full'
                    />
                    <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                  </div>
                  <h2 className='text-base font-semibold text-indigo-100'>
                    Victor
                  </h2>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className='w-[35px] flex md:hidden h-[35px] rounded-lg bg-indigo-800 shadow-lg hover:shadow-indigo-800/50 justify-center cursor-pointer items-center text-indigo-100'
              >
                <span>
                  <MdOutlineList />
                </span>
              </div>
            </div>
            <div className='py-4'>
              <div className='bg-indigo-300 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                <div className='w-full flex justify-start items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div>
                      <img
                        src='http://localhost:3000/images/demo.jpg'
                        alt='My profile image.'
                        className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                      />
                    </div>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                      <span>How are you?</span>
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-end items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div className='flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                      <span>How are you?</span>
                    </div>
                    <div>
                      <img
                        src='http://localhost:3000/images/admin.jpg'
                        alt='My profile image.'
                        className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                      />
                    </div>
                  </div>
                </div>
                <div className='w-full flex justify-start items-center'>
                  <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div>
                      <img
                        src='http://localhost:3000/images/demo.jpg'
                        alt='My profile image.'
                        className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                      />
                    </div>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                      <span>I need help</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className='flex gap-3'>
              <input
                type='text'
                placeholder='Input your message...'
                className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-green-500 rounded-lg outline-none bg-indigo-300 text-indigo-700'
              />
              <button
                className='bg-indigo-600
                    hover:bg-indigo-400  hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer  text-white rounded-lg py-2 px-12 '
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCustomer;
