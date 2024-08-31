import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';
import {
  getVendors,
  clearMessages,
} from './../../store/Reducers/vendorReducer';

const VendorRequests = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, vendors, totalVendors } =
    useSelector((state) => state.vendors);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(
      getVendors({
        perPage,
        searchValue,
        page: currentPage,
      })
    );
  }, [dispatch, perPage, searchValue, currentPage]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3'>Vendor Requests</h1>
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
                  Name
                </th>
                <th scope='col' className='py-3 px-4'>
                  Email
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Status
                </th>

                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {vendors.map((d, i) => (
                <tr key={i} className='border-b border-indigo-200'>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {i + 1}
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.name}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {d.email}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <span>{d.payment}</span>
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <span>{d.status}</span>
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/admin/dashboard/vendor/details/${d._id}`}
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

export default VendorRequests;
