import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MdOutlineArrowDownward } from 'react-icons/md';

import Pagination from '../Pagination';

import { get_admin_orders } from './../../store/Reducers/orderReducer';

const Orders = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(null);

  const { myOrders = [], totalOrders } = useSelector(
    (state) => state.order || {}
  );

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_admin_orders(obj));
  }, [dispatch, searchValue, currentPage, perPage]);
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md '>
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
        <div className='relative mt-5 overflow-x-auto'>
          <div className='w-full text-sm text-left text-[#d0d2d6]'>
            <div className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <div className='flex justify-between items-center'>
                <div className='py-3 w-[25%] font-bold'>Order id</div>
                <div className='py-3 w-[13%] font-bold'>Price</div>
                <div className='py-3 w-[18%] font-bold'>Payment status</div>
                <div className='py-3 w-[18%] font-bold'>Order status</div>
                <div className='py-3 w-[18%] font-bold'>Action</div>
                <div className='py-3 w-[8%] font-bold'>
                  <MdOutlineArrowDownward />
                </div>
              </div>
            </div>
            {/* Order Item */}
            {myOrders.map((order, index) => (
              <React.Fragment key={order._id}>
                {' '}
                <div className=' text-[#d0d2d6] '>
                  <div className='flex justify-between items-start border-b border-slate-700'>
                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>
                      #{order._id.slice(-5)}
                    </div>
                    <div className='py-3 w-[13%] font-medium'>
                      ${order.price}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      {order.payment_status}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      {order.delivery_status}
                    </div>
                    <div className='py-3 w-[18%] font-medium'>
                      <Link to={`/admin/dashboard/order/details/${order._id}`}>
                        View
                      </Link>
                    </div>
                    <div
                      onClick={() =>
                        setShow(show === order._id ? null : order._id)
                      }
                      className='py-3 w-[8%] font-bold'
                    >
                      <MdOutlineArrowDownward
                        className={`transform transition-transform duration-300 ${
                          show === order._id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {/* Additional Order Details */}
                <div
                  className={
                    show === order._id
                      ? 'block border-b border-slate-700 bg-[#8288ed]'
                      : 'hidden'
                  }
                >
                  {order.suborder.map((sOrder, i) => (
                    <div
                      key={i}
                      className='flex justify-start items-start border-b border-slate-700'
                    >
                      <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>
                        #{sOrder._id.slice(-5)}
                      </div>
                      <div className='py-3 w-[13%] font-medium'>
                        ${sOrder.price}
                      </div>
                      <div className='py-3 w-[18%] font-medium'>
                        {sOrder.payment_status}
                      </div>
                      <div className='py-3 w-[18%] font-medium'>
                        {' '}
                        {sOrder.delivery_status}
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Pagination */}
        {totalOrders > perPage && (
          <div className='w-full flex justify-end mt-4 bottom-3 right-4'>
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
