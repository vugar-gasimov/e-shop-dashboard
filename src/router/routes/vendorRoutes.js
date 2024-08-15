import { lazy } from 'react';

const Home = lazy(() => import('../../views/Home'));
const VendorDashboard = lazy(() =>
  import('../../views/vendor/VendorDashboard')
);
const AddProduct = lazy(() => import('../../views/vendor/AddProduct'));
const AllProducts = lazy(() => import('../../views/vendor/AllProducts'));
const DiscountProducts = lazy(() =>
  import('../../views/vendor/DiscountProducts')
);
const Orders = lazy(() => import('../../views/vendor/Orders'));

export const vendorRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'vendor'],
  },
  {
    path: '/vendor/dashboard',
    element: <VendorDashboard />,
    ability: ['vendor'],
  },
  {
    path: '/vendor/dashboard/add-product',
    element: <AddProduct />,
    ability: ['vendor'],
  },
  {
    path: '/vendor/dashboard/all-products',
    element: <AllProducts />,
    ability: ['vendor'],
  },
  {
    path: '/vendor/dashboard/discount-products',
    element: <DiscountProducts />,
    ability: ['vendor'],
  },
  {
    path: '/vendor/dashboard/orders',
    element: <Orders />,
    ability: ['vendor'],
  },
];
