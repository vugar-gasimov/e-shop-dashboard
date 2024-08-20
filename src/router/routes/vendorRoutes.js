import { lazy } from 'react';

const VendorDashboard = lazy(() =>
  import('../../views/vendor/VendorDashboard')
);
const AddProduct = lazy(() => import('../../views/vendor/AddProduct'));
const AllProducts = lazy(() => import('../../views/vendor/AllProducts'));
const EditProduct = lazy(() => import('../../views/vendor/EditProduct'));
const DiscountProducts = lazy(() =>
  import('../../views/vendor/DiscountProducts')
);
const Orders = lazy(() => import('../../views/vendor/Orders'));
const OrderDetails = lazy(() => import('../../views/vendor/OrderDetails'));
const Payments = lazy(() => import('../../views/vendor/Payments'));
const ChatCustomer = lazy(() => import('../../views/vendor/ChatCustomer'));
const ChatSupport = lazy(() => import('../../views/vendor/ChatSupport'));
const MyProfile = lazy(() => import('../../views/vendor/MyProfile'));
const Pending = lazy(() => import('../../views/Pending'));
const Deactive = lazy(() => import('../../views/Deactive'));

export const vendorRoutes = [
  {
    path: '/vendor/account-pending',
    element: <Pending />,
    ability: 'vendor',
  },
  {
    path: '/vendor/account-deactive',
    element: <Deactive />,
    ability: 'vendor',
  },
  {
    path: '/vendor/dashboard',
    element: <VendorDashboard />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/add-product',
    element: <AddProduct />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/edit-product/:productId',
    element: <EditProduct />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/all-products',
    element: <AllProducts />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/discount-products',
    element: <DiscountProducts />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/orders',
    element: <Orders />,
    role: 'vendor',
    visibility: ['active', 'deactive'],
  },
  {
    path: '/vendor/dashboard/order/details/:orderId',
    element: <OrderDetails />,
    role: 'vendor',
    visibility: ['active', 'deactive'],
  },
  {
    path: '/vendor/dashboard/payments',
    element: <Payments />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/chat-customer/:customerId',
    element: <ChatCustomer />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/chat-customer',
    element: <ChatCustomer />,
    role: 'vendor',
    status: 'active',
  },
  {
    path: '/vendor/dashboard/chat-support',
    element: <ChatSupport />,
    role: 'vendor',
    visibility: ['active', 'deactive', 'pending'],
  },
  {
    path: '/vendor/dashboard/my-profile',
    element: <MyProfile />,
    role: 'vendor',
    visibility: ['active', 'deactive', 'pending'],
  },
];
