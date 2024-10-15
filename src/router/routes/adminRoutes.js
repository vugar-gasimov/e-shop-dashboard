import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import('../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));
const Vendors = lazy(() => import('../../views/admin/Vendors'));
const PaymentRequests = lazy(() => import('../../views/admin/PaymentRequests'));
const DeactivateVendor = lazy(() =>
  import('../../views/admin/DeactivateVendor')
);
const VendorRequests = lazy(() => import('../../views/admin/VendorRequests'));
const VendorDetails = lazy(() => import('../../views/admin/VendorDetails'));
const LiveChat = lazy(() => import('../../views/admin/LiveChat'));
const OrderDetails = lazy(() => import('../../views/admin/OrderDetails'));

export const adminRoutes = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/orders',
    element: <Orders />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/category',
    element: <Category />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/vendors',
    element: <Vendors />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/payment-requests',
    element: <PaymentRequests />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/deactivate-vendor',
    element: <DeactivateVendor />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/vendor-requests',
    element: <VendorRequests />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/vendor/details/:vendorId',
    element: <VendorDetails />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/live-chat',
    element: <LiveChat />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/live-chat/:vendorId',
    element: <LiveChat />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/order/details/:orderId',
    element: <OrderDetails />,
    role: 'admin',
  },
];
