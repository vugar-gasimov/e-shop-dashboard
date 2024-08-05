import React from 'react';
import {
  MdOutlineCurrencyExchange,
  MdOutlineProductionQuantityLimits,
} from 'react-icons/md';
import { FaUsers, FaCartShopping } from 'react-icons/fa6';
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
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
            <h2 className='text-3xl font-bold'>$36</h2>
            <span className='text-md font-medium'>Total Sale</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl'>
            <MdOutlineCurrencyExchange className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>$50</h2>
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
            <h2 className='text-3xl font-bold'>10</h2>
            <span className='text-md font-medium'>Vendors</span>
          </div>{' '}
          <div className='w-[40px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl'>
            <FaUsers className='text-[#fae8e8] shadow-lg' />
          </div>
        </div>
        <div className='flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3'>
          <div className='flex flex-col justify-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>$54</h2>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
