import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import {
  // vendorUpdateOrderStatus,
  clearMessages,
  get_vendor_order,
} from '../../store/Reducers/orderReducer';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const [status, setStatus] = useState('');

  const { order, successMessage, errorMessage } = useSelector(
    (state) => state.order || {}
  );

  useEffect(() => {
    setStatus(order?.delivery_status);
  }, [order]);

  useEffect(() => {
    dispatch(get_vendor_order(orderId));
  }, [dispatch, orderId]);

  const statusHandler = (e) => {
    //  dispatch(
    //    vendorUpdateOrderStatus({ orderId, info: { status: e.target.value } })
    //  );
    setStatus(e.target.value);
  };

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

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[20px] font-bold mb-3 text-indigo-600'>
        Order Details
      </h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md '>
        <div className='flex justify-end items-center p-4'>
          <select
            onChange={statusHandler}
            value={status}
            name=''
            id=''
            className='px-4 py-2 focus:border-indigo-500 outline-none bg-indigo-300 border border-[#6a5fdf]  rounded-lg text-indigo-700'
          >
            <option value='pending'>pending</option>
            <option value='processing'>processing</option>
            <option value='warehouse'>warehouse</option>
            <option value='placed'>placed</option>
            <option value='cancelled'>cancelled</option>
          </select>
        </div>
        <div className='p-4'>
          <div className='flex gap-2 text-lg text-indigo-100'>
            <h2>Full order id: #{order._id}</h2>
            <span>Date: {order.date}</span>
          </div>
          <div className='flex flex-wrap'>
            <div className=''>
              <div className='pr-3 text-indigo-100 text-lg'>
                <div className='flex flex-col gap-2'>
                  <h2 className='pb-2 text-lg font-semibold'>
                    Deliver to: {order.shippingInfo?.name || 'N/A'}
                  </h2>
                  <div className='text-sm space-y-1'>
                    <p>
                      <span className='font-medium'>Address: </span>
                      {order.shippingInfo?.address || 'N/A'}
                    </p>
                    <p>
                      <span className='font-medium'>City: </span>
                      {order.shippingInfo?.city || 'N/A'}
                    </p>
                    <p>
                      <span className='font-medium'>Province: </span>
                      {order.shippingInfo?.province || 'N/A'}
                    </p>
                    <p>
                      <span className='font-medium'>Area: </span>
                      {order.shippingInfo?.area || 'N/A'}
                    </p>
                    <p>
                      <span className='font-medium'>Contact: </span>
                      {order.shippingInfo?.phone || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className='flex justify-start items-center gap-3'>
                  <h2>Payment Status</h2>
                  <span className='text-base'>
                    {order.payment_status || 'N/A'}
                  </span>
                </div>
                <span>Price: ${order.price || 'N/A'}</span>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100 px-2'>
                    {order.products &&
                      order.products.map((product, index) => (
                        <div className='flex gap-3 text-md items-center'>
                          <img
                            src={
                              product.images[0] ||
                              'http://localhost:3000/images/default-category.jpg'
                            }
                            alt={`${product.name || 'Product'} img`}
                            onError={(e) => {
                              e.target.src =
                                'http://localhost:3001/images/default-category.jpg';
                            }}
                            className='w-[50px] h-[50px] rounded-lg object-cover'
                          />
                          <div>
                            <h3>Name: {product.name}</h3>
                            <p>
                              <span>Brand: </span>
                              <span>{product.brand} </span>
                              <span className='text-lg'>
                                {' '}
                                Quantity: {product.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100'>
                    <div className='flex gap-3 text-md items-center'>
                      <img
                        src='http://localhost:3000/images/category/1.jpg'
                        alt='Product image.'
                        className='w-[50px] h-[50px] rounded-lg'
                      />
                      <div>
                        <h3>Product name here</h3>
                        <p>
                          <span>Brand: </span>
                          <span>Easy </span>
                          <span className='text-lg'>Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 flex flex-col gap-4 bg-indigo-400 px-2 py-1 rounded-lg'>
                  <div className='text-indigo-100'>
                    <div className='flex gap-3 text-md items-center'>
                      <img
                        src='http://localhost:3000/images/category/1.jpg'
                        alt='Product image.'
                        className='w-[50px] h-[50px] rounded-lg'
                      />
                      <div>
                        <h3>Product name here</h3>
                        <p>
                          <span>Brand: </span>
                          <span>Easy </span>
                          <span className='text-lg'>Quantity: 3</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
