import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { FaRegImage } from 'react-icons/fa6';

import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { add_banner } from '../../store/Reducers/bannerReducer';

const AddBanner = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const loader = false;

  const [showImage, setShowImage] = useState('');
  const [image, setImage] = useState('');

  const imageHandler = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(files[0]);
      setShowImage(URL.createObjectURL(files[0]));
    }
  }; // End of image handler

  const addBannerImageForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('mainBanner', image);
    dispatch(add_banner(formData));
  }; // End of add banner image form

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>Add Banner</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <form onSubmit={addBannerImageForm}>
          <div className='mb-4'>
            <label
              className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed  hover:border-[#3f34b8]  w-full rounded-lg text-white'
              htmlFor='image'
            >
              <span className='text-4xl'>
                <FaRegImage size={25} />
              </span>
              <span>Select banner image</span>
            </label>
            <input
              required
              onChange={imageHandler}
              className='hidden '
              type='file'
              id='image'
            />
          </div>

          {showImage && (
            <div>
              <img
                className='w-full h-[350px] object-contain rounded-lg shadow-lg'
                src={showImage}
                alt='Uploaded img'
              />
            </div>
          )}
          <button
            disabled={loader ? true : false}
            type='submit'
            className={`bg-indigo-600 text-white rounded-lg py-2 px-7 my-2
    ${
      loader
        ? 'cursor-not-allowed pointer-events-none'
        : 'hover:bg-indigo-400 hover:shadow-md hover:shadow-indigo-400/40 cursor-pointer'
    }`}
          >
            {loader ? (
              <div
                className='bg-indigo-600
                     rounded-lg w-36 px-7 '
              >
                <PropagateLoader color='#D1D5DB' cssOverride={overrideStyle} />
              </div>
            ) : (
              'Add banner'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
