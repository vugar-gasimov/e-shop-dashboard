import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  clearMessages,
  get_vendor_messages,
  send_admin_message,
  updateAdminMessage,
} from '../../store/Reducers/chatReducer';

import { socket } from '../../utils/utils';

const ChatSupport = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();

  const [text, setText] = useState('');

  const {
    vendors,
    activeVendor,
    admin_vendor_messages,
    currentVendor,
    successMessage,
  } = useSelector((state) => state.vendor_chat);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_vendor_messages());
  }, [dispatch]);

  const textHandler = (e) => {
    e.preventDefault();

    dispatch(
      send_admin_message({
        senderId: userInfo._id,
        receiverId: '',
        message: text,
        senderName: userInfo.name,
      })
    );
    setText('');
  };

  useEffect(() => {
    socket.on('received_admin_message', (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        'send_message_vendor_admin',
        admin_vendor_messages[admin_vendor_messages.length - 1]
      );
      dispatch(clearMessages());
    }
  }, [dispatch, admin_vendor_messages, successMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [admin_vendor_messages]);

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]'>
        <div className='flex w-full h-full relative'>
          <div className='w-full  md:pl-4'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-start gap-3 items-center'>
                <div className='relative'>
                  <img
                    src='http://localhost:3000/images/admin.jpg'
                    alt="Admin's profile picture."
                    className='w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full'
                    onError={(e) => {
                      e.target.src = 'http://localhost:3001/images/admin.jpg'; // Fallback if 3000 fails
                    }}
                  />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0'></div>
                </div>
                <h2 className='text-base font-semibold text-indigo-100'>
                  Admin Support
                </h2>
              </div>
            </div>
            <div className='py-4'>
              <div className='bg-indigo-300 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto'>
                {admin_vendor_messages.map((message, i) => {
                  const isCurrentVendor = userInfo._id === message.senderId;
                  const profileImage = isCurrentVendor
                    ? currentVendor?.image ||
                      'http://localhost:3000/images/demo.jpg'
                    : 'http://localhost:3000/images/admin.jpg';

                  const altText = isCurrentVendor
                    ? `${currentVendor?.name || 'Vendor'}'s profile image`
                    : 'Admin profile image';

                  const handleImageError = (e) => {
                    e.target.src = isCurrentVendor
                      ? 'http://localhost:3001/images/demo.jpg'
                      : 'http://localhost:3001/images/admin.jpg';
                  };

                  return isCurrentVendor ? (
                    <div
                      ref={scrollRef}
                      key={i}
                      className='w-full flex justify-start items-center'
                    >
                      <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                        <div>
                          <img
                            src={profileImage}
                            alt={altText}
                            onError={handleImageError}
                            className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                          />
                        </div>
                        <div className='flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                          <span>{message.message}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      ref={scrollRef}
                      key={i}
                      className='w-full flex justify-end items-center'
                    >
                      <div className='flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                        <div className='flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-blue-500/50 text-indigo-100 py-1 px-2 rounded-lg'>
                          <span>{message.message}</span>
                        </div>
                        <div>
                          <img
                            src={profileImage}
                            alt={altText}
                            onError={handleImageError}
                            className='w-[38px] h-[38px] border-2 border-indigo-100 rounded-full max-w-[38px] p-[3px]'
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={textHandler} className='flex gap-3'>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type='text'
                placeholder='Input your message...'
                className='w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-green-500 rounded-lg outline-none bg-indigo-300 text-indigo-700'
              />
              <button
                type='submit'
                className='bg-indigo-600
                    hover:bg-indigo-400  hover:shadow-indigo-400/40 hover:shadow-md cursor-pointer  text-white rounded-lg py-2 px-12 '
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

export default ChatSupport;
