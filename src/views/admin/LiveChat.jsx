import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { socket } from '../../utils/utils';

import { MdOutlineClose, MdOutlineList } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';

import {
  clearMessages,
  get_admin_messages,
  get_vendors,
  send_admin_message,
  updateVendorMessage,
} from '../../store/Reducers/chatReducer';
import toast from 'react-hot-toast';

const LiveChat = () => {
  const dispatch = useDispatch();
  const { vendorId } = useParams();
  const scrollRef = useRef();

  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [receiverMessage, setReceiverMessage] = useState('');

  const {
    vendors,
    activeVendor,
    admin_vendor_messages,
    currentVendor,
    successMessage,
  } = useSelector((state) => state.vendor_chat);

  useEffect(() => {
    dispatch(get_vendors());
  }, [dispatch]);

  const textHandler = (e) => {
    e.preventDefault();

    dispatch(
      send_admin_message({
        senderId: '',
        receiverId: vendorId,
        message: text,
        senderName: 'Admin Support',
      })
    );
    setText('');
  };

  useEffect(() => {
    if (vendorId) {
      dispatch(get_admin_messages(vendorId));
    }
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        'send_message_admin_vendor',
        admin_vendor_messages[admin_vendor_messages.length - 1]
      );
      dispatch(clearMessages());
    }
  }, [dispatch, admin_vendor_messages, successMessage]);

  useEffect(() => {
    socket.on('received_vendor_message', (msg) => {
      setReceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        receiverMessage.senderId === vendorId &&
        receiverMessage.receiverId === ''
      ) {
        dispatch(updateVendorMessage(receiverMessage));
      } else {
        toast.success(`${receiverMessage.senderName} sent a message.`);
        dispatch(clearMessages());
      }
    }
  }, [receiverMessage, dispatch, vendorId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [admin_vendor_messages]);

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
                <h1 className=''>Vendors</h1>
                <span
                  onClick={() => setShow(!show)}
                  className='block cursor-pointer md:hidden'
                >
                  <MdOutlineClose />
                </span>
              </div>
              {vendors.length > 0 ? (
                vendors.map((vendor, i) => (
                  <Link
                    to={`/admin/dashboard/live-chat/${vendor._id}`}
                    key={i}
                    className={`h-[60px] flex justify-start gap-2 items-center text-indigo-100 px-2 py-2 cursor-pointer ${
                      vendorId === vendor._id ? 'bg-indigo-400' : ''
                    }  rounded-lg`}
                  >
                    <div className='relative'>
                      <img
                        src={
                          vendor.image
                            ? vendor.image
                            : 'http://localhost:3000/images/admin.jpg'
                        }
                        alt={`Profile pict of ${vendor.name}`}
                        className='w-[38px] h-[38px] border-indigo-300 border-2 max-w-[38px] p-[2px] rounded-full'
                        onError={(e) => {
                          e.target.src =
                            'http://localhost:3001/images/admin.jpg';
                        }}
                      />
                      {activeVendor.some(
                        (active) => active.vendorId === vendor._id
                      ) && (
                        <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                      )}
                    </div>
                    <div className='flex justify-center items-start flex-col w-full'>
                      <div className='flex justify-between items-center w-full'>
                        <h2 className='text-base font-semibold'>
                          {vendor.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className='text-indigo-100'>
                  No vendors available at the moment.
                </p>
              )}
            </div>
          </div>
          <div className='w-full md:w-[calc(100%-200px)] md:pl-4'>
            <div className='flex justify-between items-center'>
              {vendorId && (
                <div className='flex justify-start gap-3 items-center'>
                  <div className='relative'>
                    <img
                      src={
                        currentVendor?.image ||
                        'http://localhost:3000/images/demo.jpg'
                      }
                      alt={
                        currentVendor
                          ? `${currentVendor.name}'s profile picture.`
                          : "Vendor's profile picture."
                      }
                      className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full'
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'http://localhost:3001/images/demo.jpg';
                      }}
                    />
                    <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                  </div>
                  <span className='text-white font-semibold'>
                    {currentVendor?.name || 'Vendor Name'}
                  </span>
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
                {vendorId ? (
                  admin_vendor_messages.map((m, i) => {
                    const isVendorMessage = m.senderId === vendorId;
                    const profileImage = isVendorMessage
                      ? currentVendor?.image ||
                        'http://localhost:3000/images/demo.jpg'
                      : 'http://localhost:3000/images/admin.jpg';

                    const altText = isVendorMessage
                      ? `${currentVendor?.name || 'Vendor'}'s profile image`
                      : 'Admin profile image';

                    const handleImageError = (e) => {
                      e.target.src = isVendorMessage
                        ? 'http://localhost:3001/images/demo.jpg'
                        : 'http://localhost:3001/images/admin.jpg';
                    };

                    return (
                      <div
                        ref={scrollRef}
                        className={`w-full flex ${
                          isVendorMessage ? 'justify-start' : 'justify-end'
                        } items-center`}
                        key={i}
                      >
                        <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                          {isVendorMessage && (
                            <div>
                              <img
                                src={profileImage}
                                alt={altText}
                                onError={handleImageError}
                                className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                              />
                            </div>
                          )}
                          <div
                            className={`flex justify-center items-start flex-col w-full ${
                              isVendorMessage ? 'bg-blue-500' : 'bg-orange-500'
                            } shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg`}
                          >
                            <span>{m.message}</span>
                          </div>
                          {!isVendorMessage && (
                            <div>
                              <img
                                src={profileImage}
                                alt={altText}
                                onError={handleImageError}
                                className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className='w-full h-full flex justify-center items-center flex-col gap-2 text-white'>
                    <FaUserPlus size={25} />
                    <span>Select a vendor</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={textHandler} className='flex gap-3'>
              <input
                readOnly={!vendorId}
                disabled={!vendorId}
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder={
                  vendorId
                    ? 'Input your message...'
                    : 'Select a vendor to start typing...'
                }
                className={`w-full px-2 py-[5px] border items-center rounded-lg outline-none text-indigo-700 
      ${
        vendorId
          ? 'bg-indigo-300 border-slate-700 focus:border-green-500'
          : 'bg-gray-300 border-gray-500 cursor-not-allowed'
      }
    `}
              />
              <button
                type='submit'
                disabled={!vendorId}
                className={`py-2 px-12 text-white rounded-lg transition-all 
      ${
        vendorId
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

export default LiveChat;
