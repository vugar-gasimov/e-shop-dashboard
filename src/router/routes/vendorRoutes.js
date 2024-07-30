import { lazy } from 'react';

const Home = lazy(() => import('../../views/Home'));

export const vendorRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'vendor'],
  },
];
