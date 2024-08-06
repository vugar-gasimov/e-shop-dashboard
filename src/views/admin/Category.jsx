import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import {
  MdDeleteOutline,
  MdOutlineEditNote,
  MdOutlineImage,
} from 'react-icons/md';

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='flex flex-wrap w-full'>
        <div className='w-full lg:w-7/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
            <div className='flex justify-between items-center'>
              <select
                onChange={(e) => setPerPage(parseInt(e.target.value))}
                name=''
                id=''
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6]'
              >
                <option value='5' className=''>
                  5
                </option>
                <option value='10' className=''>
                  10
                </option>
                <option value='20' className=''>
                  20
                </option>
              </select>
              <input
                type='text'
                placeholder='Search...'
                className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-600 border border-slate-700 rounded-md text-[#d0d2d6]'
              />
            </div>
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
          } z-20 top-0 transition-all duration-500`}
        >
          <div className='w-full pl-5 '>
            <div className='bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
              <h2 className='text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center'>
                Add category
              </h2>
              <form className=''>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor='name'>Category name</label>
                  <input
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
                    <span>
                      <MdOutlineImage size={25} />
                    </span>
                    <span>Select image</span>
                  </label>
                  <input
                    type='file'
                    name='image'
                    id='image'
                    alt='Input for image'
                    className='hidden'
                  />
                  <div className=''>
                    <button
                      className='bg-indigo-600
                    hover:bg-indigo-400 w-full hover:shadow-indigo-400/40 hover:shadow-md text-white rounded-lg py-2 px-7 my-2'
                    >
                      Add category
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
