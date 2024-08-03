import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdChat,
  MdPeople,
  MdPayment,
  MdCancel,
  MdRequestPage,
} from 'react-icons/md';
import { TiShoppingCart } from 'react-icons/ti';

const DASHBOARD_ICON = <MdOutlineDashboard />;
const CATEGORY_ICON = <MdOutlineCategory />;
const CART_ICON = <TiShoppingCart />;
const CHAT_ICON = <MdChat />;
const VENDORS_ICON = <MdPeople />;
const PAYMENT_ICON = <MdPayment />;
const DEACTIVATE_VENDOR_ICON = <MdCancel />;
const VENDOR_REQUESTS_ICON = <MdRequestPage />;

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
];
