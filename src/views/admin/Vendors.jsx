import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import {
  MdDeleteOutline,
  MdOutlineEditNote,
  MdOutlineRemoveRedEye,
} from 'react-icons/md';

const Vendors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className='px-2 lg:px-7 pt-5'>
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
                  Shop name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Division
                </th>
                <th scope='col' className='py-3 px-4'>
                  District
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
                    V.Gasimov
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    Easy Shop
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>Pending</span>
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    vuqar585@gmail.com
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>Pending</span>
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>Pending</span>
                  </td>

                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'>
                        <MdOutlineRemoveRedEye size={25} />
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
  );
};

export default Vendors;
