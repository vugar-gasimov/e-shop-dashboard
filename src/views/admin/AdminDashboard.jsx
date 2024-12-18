import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';

import {
  MdOutlineCurrencyExchange,
  MdOutlineProductionQuantityLimits,
} from 'react-icons/md';
import { FaUsers, FaCartShopping } from 'react-icons/fa6';

import toast from 'react-hot-toast';
import moment from 'moment/moment';

import adminImg from '../../assets/admin.jpg';
import vendorImg from '../../assets/seller.png';

import {
  clearMessages,
  get_admin_dashboard,
} from '../../store/Reducers/dashboardReducer';
const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    errorMessage,
    successMessage,
    totalSales,
    totalProducts,
    totalOrders,
    totalVendors,
    recentMessages,
    recentOrders,
  } = useSelector((state) => state.dashboard);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_admin_dashboard());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearMessages());
    }
  }, [dispatch, successMessage, errorMessage]);

  const state = {
    series: [
      {
        name: 'Orders',
        data: [53, 38, 74, 45, 55, 97, 45, 52, 56, 37, 97, 34],
      },
      {
        name: 'Revenue',
        data: [64, 53, 23, 34, 54, 46, 54, 65, 85, 92, 25, 58],
      },
      {
        name: 'Vendors',
        data: [94, 46, 73, 34, 54, 38, 74, 65, 86, 79, 35, 58],
      },
    ],
    options: {
      color: ['#181ee8', '#181ee8'],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6',
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apl',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apl',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: '550px',
            },
          },
        },
      ],
    },
  };

  return (
    <div className='px-2 md:px-7 py-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        <div className='flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>${totalSales}</h2>
            <span className='text-md font-medium'>Total Sale</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{totalProducts}</h2>
            <span className='text-md font-medium'>Products</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl'>
            <MdOutlineProductionQuantityLimits
              className='text-[#fae8e8]
            shadow-lg'
            />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>{totalVendors}</h2>
            <span className='text-md font-medium'>Vendors</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <FaUsers className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>${totalOrders}</h2>
            <span className='text-md font-medium'>Orders</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl'>
            <FaCartShopping className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap mt-7'>
        <div className='w-full lg:w-7/12 lg:pr-3'>
          <div className='w-full bg-[#6a5fdf] p-4 rounded-md'>
            <Chart
              options={state.options}
              series={state.series}
              type='bar'
              height={350}
            />
          </div>
        </div>
        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <div className='w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6] '>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
                Recent Vendor Message
              </h2>
              <Link className='font-semibold text-sm text-[#d0d2d6]'>
                View all
              </Link>
            </div>
            <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6'>
              <ol className='relative border-1 border-slate-600 ml-4'>
                {recentMessages.map((message, index) => {
                  const isUserSender = message.senderId === userInfo._id;
                  const vendorImageSrc =
                    totalVendors[index]?.image ||
                    vendorImg ||
                    'http://localhost:3000/images/seller.png' ||
                    'http://localhost:3001/images/seller.png';
                  const userImageSrc =
                    userInfo.image ||
                    adminImg ||
                    'http://localhost:3000/images/admin.jpg' ||
                    'http://localhost:3001/images/admin.jpg';

                  return (
                    <li key={message._id || index} className='mb-3 ml-6 '>
                      <div className='flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[2px] bg-[#4c7fe2] rounded-full z-10'>
                        {' '}
                        <img
                          src={isUserSender ? userImageSrc : vendorImageSrc}
                          alt={isUserSender ? 'Admin image' : 'Vendor image'}
                          className='w-full rounded-full h-full'
                        />
                      </div>
                      <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                        <div className='flex justify-between items-center mb-2'>
                          <Link className='text-md font-normal'>
                            {message.senderName}
                          </Link>
                          <time
                            className='mb-1 text-sm font-normal sm:order-last sm:mb-0'
                            dateTime=''
                          >
                            {moment(message.createdAt)
                              .startOf('hour')
                              .fromNow()}
                          </time>
                        </div>
                        <div className='p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800'>
                          {message.message}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
        <div className='flex justify-between items-center'>
          <h2 className='font-semibold text-lg text-[#d0d2d6] pb-3'>
            Recent orders
          </h2>
          <Link className='font-semibold text-sm text-[#d0d2d6]'>View all</Link>
        </div>
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]  '>
            <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
              <tr className=''>
                <th scope='col' className='py-3 px-4'>
                  Order id
                </th>
                <th scope='col' className='py-3 px-4'>
                  Price
                </th>
                <th scope='col' className='py-3 px-4'>
                  Payment status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Order status
                </th>
                <th scope='col' className='py-3 px-4'>
                  Active
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {recentOrders.map((data, i) => (
                <tr key={data._id || i} className=''>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>
                    #{data._id}
                  </td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>
                    ${data.price}
                  </td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>
                    {data.payment_status}
                  </td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>
                    {data.delivery_status}
                  </td>
                  <td className='py-3 px-4 font-medium whitespace-nowrap'>
                    <Link to={`/admin/dashboard/order/details/${data._id}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
