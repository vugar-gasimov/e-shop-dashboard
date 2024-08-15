import React from 'react';
import { PiUserCirclePlus } from 'react-icons/pi';
import { FadeLoader } from 'react-spinners';
const MyProfile = () => {
  const image = true;
  const loader = false;
  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full md:w-6/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-indigo-100'>
            <div className='flex justify-center items-center py-3'>
              {image ? (
                <label htmlFor='' className=''></label>
              ) : (
                <label
                  htmlFor='img'
                  className='flex justify-center items-center flex-col h-[175px] w-[250px] cursor-pointer border border-dashed hover:border-indigo-400 border-indigo-300 relative rounded-lg'
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
            </div>
          </div>
        </div>
        <div className='w-full md:w-6/12'></div>
      </div>
    </div>
  );
};

export default MyProfile;
