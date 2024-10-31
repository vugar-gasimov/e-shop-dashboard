import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { LuPackageSearch } from 'react-icons/lu';

import Search from '../components/Search';

import Pagination from '../Pagination';
import { get_vendor_orders } from '../../store/Reducers/orderReducer';

const Orders = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);

  const { myOrders = [], totalOrders } = useSelector(
    (state) => state.order || {}
  );
  const { userInfo } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
      vendorId: userInfo._id,
    };
    dispatch(get_vendor_orders(obj));
  }, [dispatch, searchValue, currentPage, perPage, userInfo]);

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-700'>Orders</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <Search
          setPerPage={setPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className='relative overflow-x-auto mt-5'>
          <table className='w-full text-sm text-left text-[#d0d2d6]  '>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr className=''>
                <th scope='col' className='py-3 px-4'>
                  Order Id
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Order Status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Date
                </th>
                <th scope='col' className='py-3 px-4'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {myOrders.map((order) => (
                <tr key={order._id} className=''>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    #{order._id.slice(-5)}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    ${order.price}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {order.payment_status}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {order.delivery_status}
                  </td>
                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    {order.date
                      .replace(/\bJanuary\b/, 'Jan')
                      .replace(/\bFebruary\b/, 'Feb')
                      .replace(/\bMarch\b/, 'Mar')
                      .replace(/\bApril\b/, 'Apr')
                      .replace(/\bMay\b/, 'May')
                      .replace(/\bJune\b/, 'Jun')
                      .replace(/\bJuly\b/, 'Jul')
                      .replace(/\bAugust\b/, 'Aug')
                      .replace(/\bSeptember\b/, 'Sep')
                      .replace(/\bOctober\b/, 'Oct')
                      .replace(/\bNovember\b/, 'Nov')
                      .replace(/\bDecember\b/, 'Dec')
                      .replace(/,|PM|AM/g, '')
                      .trim()}
                  </td>

                  <td className='py-2 px-4 font-medium whitespace-nowrap'>
                    <div className='flex justify-start items-center gap-4'>
                      <Link
                        to={`/vendor/dashboard/order/details/${order._id}`}
                        className='p-[6px] rounded-lg bg-transparent hover:shadow-lg hover:shadow-s/50 hover:text-indigo-800'
                      >
                        <LuPackageSearch size={24} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalOrders > perPage && (
          <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrders}
              perPage={perPage}
              showItem={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
