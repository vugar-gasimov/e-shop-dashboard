import { lazy } from 'react';

const Home = lazy(() => import('../../views/Home'));
const VendorDashboard = lazy(() =>
  import('../../views/vendor/VendorDashboard')
);

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
];
