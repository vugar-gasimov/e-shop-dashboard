import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import {
  MdDeleteOutline,
  MdOutlineClose,
  MdOutlineEditNote,
  MdOutlineImage,
} from 'react-icons/md';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  clearMessages,
  getCategories,
} from './../../store/Reducers/categoryReducer';
import toast from 'react-hot-toast';
import Search from './../components/Search';

const Category = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.category
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState('');

  const [state, setState] = useState({
    name: '',
    image: '',
  });

  const imageHandler = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setShowImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };
  const add_category = (e) => {
    e.preventDefault();
    dispatch(addCategory(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      setState({
        name: '',
        image: '',
      });
      setShowImage('');
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getCategories(obj));
  }, [dispatch, currentPage, searchValue, perPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md'>
        <h2 className='text-[#d0d2d6] font-semibold text-lg'>Category</h2>
        <button
          onClick={() => setShow(true)}
          className='bg-indigo-600 shadow-lg hover:shadow-indigo-500/50 hover:bg-indigo-500 px-4 py-2 cursor-pointer text-white rounded-md text-sm'
        >
          Add
        </button>
      </div>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-7/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
            <Search
              setPerPage={setPerPage}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
            />
            <div className='relative overflow-x-auto'>
              <table className='w-full text-sm text-left text-[#d0d2d6]  '>
                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                  <tr className=''>
                    <th scope='col' className='py-3 px-4'>
                      No
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Image
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Name
                    </th>
                    <th scope='col' className='py-3 px-4'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=''>
                  {[1, 2, 3, 4, 5].map((d, i) => (
                    <tr key={i} className=''>
                      <td className='py-1 px-4 font-medium whitespace-nowrap'>
                        {d}
                      </td>
                      <td className='py-1 px-4 font-medium whitespace-nowrap'>
                        <img
                          src={`http://localhost:3000/images/category/${d}.jpg`}
                          alt='Product image.'
                          className='w-[45px] h-[45px] rounded-lg'
                        />
                      </td>
                      <td className='py-1 px-4 font-medium whitespace-nowrap'>
                        Item name
                      </td>

                      <td className='py-1 px-4 font-medium whitespace-nowrap'>
                        <div className='flex justify-start items-center gap-4'>
                          <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                            <MdOutlineEditNote size={24} />
                          </Link>
                          <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                            <MdDeleteOutline size={24} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                perPage={perPage}
                showItem={3}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
            show ? 'right-0' : '-right-[340px]'
          } z-50 top-0 transition-all duration-500`}
        >
          <div className='w-full pl-5 '>
            <div className='bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center'>
                  Add category
                </h2>
                <div
                  onClick={() => setShow(false)}
                  className='block lg:hidden bg-indigo-600 rounded-lg p-1'
                >
                  <MdOutlineClose size={25} />
                </div>
              </div>

              <form onSubmit={add_category} className=''>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor='name'>Category name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    type='text'
                    id='name'
                    name='category_name'
                    placeholder='Category name'
                    className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6]'
                  />
                </div>
                <div className=''>
                  <label
                    htmlFor='image'
                    className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-indigo-700 w-full border-[#d0d2d6]'
                  >
                    {showImage ? (
                      <img
                        src={showImage}
                        alt='Added category image.'
                        className='w-full h-full object-contain'
                      />
                    ) : (
                      <>
                        <span>
                          <MdOutlineImage size={25} />
                        </span>
                        <span>Select image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandler}
                    type='file'
                    name='image'
                    id='image'
                    alt='Input for image'
                    className='hidden'
                  />
                  <div className=''>
                    <button
                      disabled={loader ? true : false}
                      className='bg-indigo-600 w-full  hover:bg-indigo-400 hover:shadow-indigo-400/40  text-white hover:shadow-md hover:text-slate-100 font-bold py-2 px-7 mb-3 my-2 rounded-lg focus:outline-none focus:shadow-outline'
                      type='submit'
                    >
                      {loader ? (
                        <PropagateLoader
                          color='#D1D5DB'
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        'Add category'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
