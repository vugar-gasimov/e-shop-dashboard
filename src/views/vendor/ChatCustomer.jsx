import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import toast from 'react-hot-toast';

import { MdOutlineClose, MdOutlineList } from 'react-icons/md';

import { socket } from '../../utils/utils';

import {
  clearMessages,
  get_customer_message,
  get_customers,
  send_message_customer,
  updateMessage,
} from '../../store/Reducers/chatReducer';
import { FaUserPlus } from 'react-icons/fa';

const ChatCustomer = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const { userInfo } = useSelector((state) => state.auth || {});
  const { customers, messages, currentCustomer, successMessage } = useSelector(
    (state) => state.vendor_chat || {}
  );

  const [show, setShow] = useState(false);
  const vendorId = 65;
  const [text, setText] = useState('');
  const [receiverMessage, setReceiverMessage] = useState('');
  const { customerId } = useParams(userInfo._id);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(get_customers(userInfo._id));
    }
  }, [dispatch, userInfo?._id]);

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_message(customerId));
    }
  }, [dispatch, customerId]);

  const textHandler = (e) => {
    e.preventDefault();

    dispatch(
      send_message_customer({
        senderId: userInfo._id || '',
        receiverId: customerId,
        text,
        name: userInfo?.shopInfo?.shopName,
      })
    );
    setText('');
  };

  useEffect(() => {
    if (successMessage) {
      socket.emit('send_vendor_message', messages[messages.length - 1]);
      dispatch(clearMessages());
    }
  }, [dispatch, messages, successMessage]);

  useEffect(() => {
    socket.on('customer_message', (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        customerId === receiverMessage.senderId &&
        userInfo._id === receiverMessage.receiverId
      ) {
        dispatch(updateMessage(receiverMessage));
      } else {
        toast.success(`${receiverMessage.senderName} sent a message.`);
        dispatch(clearMessages());
      }
    }
  }, [receiverMessage, customerId, userInfo, dispatch]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? '-left-[16px]' : '-left-[336px]'
            } md:left-0 md:relative transition-all`}
          >
            <div className='w-full h-[calc(100vh-177px)] bg-indigo-800 md:bg-transparent overflow-y-auto rounded-lg'>
              <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-indigo-100'>
                <h1 className=''>Customers</h1>
                <span
                  onClick={() => setShow(!show)}
                  className='block cursor-pointer md:hidden'
                >
                  <MdOutlineClose />
                </span>
              </div>

              {customers && customers.length > 0 ? (
                customers.map((customer, i) => (
                  <Link
                    to={`/vendor/dashboard/chat-customer/${customer.fdId}`}
                    key={i}
                    className={`h-[60px] flex justify-start gap-2 items-center text-indigo-100 px-2 py-2 cursor-pointer bg-indigo-400 rounded-lg `}
                  >
                    <div className='relative'>
                      <img
                        src='http://localhost:3001/images/admin.jpg'
                        alt="Vendor's profile picture."
                        className='w-[38px] h-[38px] border-indigo-300 border-2 max-w-[38px] p-[2px] rounded-full'
                      />
                      <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                    </div>
                    <div className='flex justify-center items-start flex-col w-full'>
                      <div className='flex justify-between items-center w-full'>
                        <h2 className='text-base font-semibold'>
                          {customer.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className='flex text-base justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-indigo-100'>
                  No vendors available
                </div>
              )}
            </div>
          </div>
          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <div className='flex justify-between items-center'>
              {vendorId && currentCustomer && (
                <div className='flex justify-start gap-3 items-center'>
                  <div className='relative'>
                    <img
                      src={
                        currentCustomer.profileImage ||
                        'http://localhost:3001/images/demo.jpg'
                      }
                      alt={`${currentCustomer.name || 'Vendor'}'s profile pic`}
                      className='w-[45px] h-[45px] border-green-500 border-2 p-[2px] rounded-full'
                    />
                    <div
                      className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'
                      aria-label='Online status'
                    ></div>
                  </div>
                  <h2 className='text-base font-semibold text-indigo-100'>
                    {currentCustomer.name || 'Customer Name'}
                  </h2>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className='w-[35px] flex md:hidden h-[35px] rounded-lg bg-indigo-800 shadow-lg hover:shadow-indigo-800/50 justify-center cursor-pointer items-center text-indigo-100'
              >
                <span>
                  <MdOutlineList />
                </span>
              </div>
            </div>
            <div className='py-4'>
              <div className='bg-indigo-300 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                {customerId && messages.length > 0 ? (
                  messages.map((message, i) => {
                    const isCustomer = message.senderId === customerId;
                    return isCustomer ? (
                      // Customer message (left-aligned)
                      <div
                        key={i}
                        ref={scrollRef}
                        className='w-full flex justify-start items-center'
                      >
                        <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                          <div>
                            <img
                              src='http://localhost:3001/images/demo.jpg'
                              alt='Customer profile img'
                              className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                            />
                          </div>
                          <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                            <span>{message.message}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Vendor message (right-aligned)
                      <div
                        key={i}
                        ref={scrollRef}
                        className='w-full flex justify-end items-center'
                      >
                        <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                          <div className='flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                            <span>{message.message}</span>
                          </div>
                          <div>
                            <img
                              src='http://localhost:3001/images/admin.jpg'
                              alt='Vendor profile img'
                              className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='w-full h-full flex justify-center items-center text-white gap-2 flex-col'>
                    <FaUserPlus size={25} />
                    <p>Select Customer</p>
                  </div>
                )}
              </div>
            </div>
            <form onSubmit={textHandler} className='flex gap-3'>
              <input
                readOnly={!customerId}
                disabled={!customerId}
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  customerId
                    ? 'Input your message...'
                    : 'Select a vendor to start typing...'
                }
                className={`w-full px-2 py-[5px] border items-center rounded-lg outline-none text-indigo-700 
      ${
        customerId
          ? 'bg-indigo-300 border-slate-700 focus:border-green-500'
          : 'bg-gray-300 border-gray-500 cursor-not-allowed'
      }
    `}
              />
              <button
                type='submit'
                disabled={!customerId}
                className={`py-2 px-12 text-white rounded-lg transition-all 
      ${
        customerId
          ? 'bg-indigo-600 hover:bg-indigo-400 cursor-pointer  hover:shadow-indigo-400/40 hover:shadow-md'
          : 'bg-gray-400 cursor-not-allowed'
      }
    `}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCustomer;
