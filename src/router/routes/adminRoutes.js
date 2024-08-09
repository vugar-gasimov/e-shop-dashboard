import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import('../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));
const Vendors = lazy(() => import('../../views/admin/Vendors'));
const PaymentRequests = lazy(() => import('../../views/admin/PaymentRequests'));
const DeactivateVendor = lazy(() =>
  import('../../views/admin/DeactivateVendor')
);

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
];
