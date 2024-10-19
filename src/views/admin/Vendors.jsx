import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import Pagination from '../Pagination';

import { get_activeVendors } from '../../store/Reducers/vendorReducer';

const Vendors = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  const { vendors = [], totalVendors } = useSelector(
    (state) => state.vendors || {}
  );

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_activeVendors(obj));
  }, [dispatch, searchValue, currentPage, perPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Vendors</h1>

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
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
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
                  Status
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
              {vendors.map((vendor, i) => (
                <tr key={i} className=''>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    {i + 1}
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <img
                      src={
                        vendor.image ||
                        `http://localhost:3000/images/default-category.jpg`
                      }
                      alt={
                        vendor.name
                          ? `${vendor.name}'s product image`
                          : 'Default product image'
                      }
                      className='w-[45px] h-[45px] rounded-lg object-cover'
                      onError={(e) => {
                        e.target.src =
                          'http://localhost:3001/images/default-category.jpg';
                      }}
                    />
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    {vendor.name}
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    {vendor.shopInfo?.shopName}
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>{vendor.payment}</span>
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    {vendor.email}
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>{vendor.status}</span>
                  </td>
                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <span>{vendor.shopInfo?.district}</span>
                  </td>

                  <td className='py-1 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/admin/dashboard/vendor/details/${vendor._id}`}
                        className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'
                      >
                        <MdOutlineRemoveRedEye size={25} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalVendors >= perPage ? (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalVendors}
              perPage={perPage}
              showItem={4}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Vendors;
