import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdChat,
  MdPeople,
  MdPayment,
  MdCancel,
  MdRequestPage,
  MdOutlineAddShoppingCart,
  MdOutlineDiscount,
} from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';
import { BsBoxes, BsCartCheck, BsPersonCircle } from 'react-icons/bs';
import { FaHandHoldingUsd } from 'react-icons/fa';
import { IoMdChatboxes, IoMdChatbubbles } from 'react-icons/io';
const DASHBOARD_ICON = <MdOutlineDashboard />;
const CATEGORY_ICON = <MdOutlineCategory />;
const CART_ICON = <TiShoppingCart />;
const CHAT_ICON = <MdChat />;
const VENDORS_ICON = <MdPeople />;
const PAYMENT_ICON = <MdPayment />;
const DEACTIVATE_VENDOR_ICON = <MdCancel />;
const VENDOR_REQUESTS_ICON = <MdRequestPage />;
const ADD_PRODUCT = <MdOutlineAddShoppingCart />;
const ALL_PRODUCTS = <BsBoxes />;
const DISCOUNT_PRODUCTS = <MdOutlineDiscount />;
const ORDERS = <BsCartCheck />;
const PAYMENTS = <FaHandHoldingUsd />;
const CHAT_CUSTOMER = <IoMdChatbubbles />;
const CHAT_SUPPORT = <IoMdChatboxes />;
const MY_PROFILE = <BsPersonCircle />;

export const allNav = [
  {
    id: 1,
    title: 'Dashboard',
    icon: DASHBOARD_ICON,
    role: 'admin',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Orders',
    icon: CART_ICON,
    role: 'admin',
    path: '/admin/dashboard/orders',
  },
  {
    id: 3,
    title: 'Category',
    icon: CATEGORY_ICON,
    role: 'admin',
    path: '/admin/dashboard/category',
  },
  {
    id: 4,
    title: 'Vendors',
    icon: VENDORS_ICON,
    role: 'admin',
    path: '/admin/dashboard/vendors',
  },
  {
    id: 5,
    title: 'Payment Requests',
    icon: PAYMENT_ICON,
    role: 'admin',
    path: '/admin/dashboard/payment-requests',
  },
  {
    id: 6,
    title: 'Deactivate Vendor',
    icon: DEACTIVATE_VENDOR_ICON,
    role: 'admin',
    path: '/admin/dashboard/deactivate-vendor',
  },
  {
    id: 7,
    title: 'Vendor Requests',
    icon: VENDOR_REQUESTS_ICON,
    role: 'admin',
    path: '/admin/dashboard/vendor-requests',
  },
  {
    id: 8,
    title: 'Live Chat',
    icon: CHAT_ICON,
    role: 'admin',
    path: '/admin/dashboard/live-chat',
  },
  {
    id: 9,
    title: 'Dashboard',
    icon: DASHBOARD_ICON,
    role: 'vendor',
    path: '/vendor/dashboard',
  },
  {
    id: 10,
    title: 'Add product',
    icon: ADD_PRODUCT,
    role: 'vendor',
    path: '/vendor/dashboard/add-product',
  },
  {
    id: 11,
    title: 'All products',
    icon: ALL_PRODUCTS,
    role: 'vendor',
    path: '/vendor/dashboard/all-products',
  },
  {
    id: 12,
    title: 'Discount products',
    icon: DISCOUNT_PRODUCTS,
    role: 'vendor',
    path: '/vendor/dashboard/discount-products',
  },
  {
    id: 13,
    title: 'Orders',
    icon: ORDERS,
    role: 'vendor',
    path: '/vendor/dashboard/orders',
  },
  {
    id: 14,
    title: 'Payments',
    icon: PAYMENTS,
    role: 'vendor',
    path: '/vendor/dashboard/payments',
  },
  {
    id: 15,
    title: 'Chat-Customer',
    icon: CHAT_CUSTOMER,
    role: 'vendor',
    path: '/vendor/dashboard/chat-customer',
  },
  {
    id: 16,
    title: 'Chat-Support',
    icon: CHAT_SUPPORT,
    role: 'vendor',
    path: '/vendor/dashboard/chat-support',
  },
  {
    id: 17,
    title: 'My Profile',
    icon: MY_PROFILE,
    role: 'vendor',
    path: '/vendor/dashboard/my-profile',
  },
];
