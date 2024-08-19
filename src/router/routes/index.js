import MainLayout from '../../layout/MainLayout';
import { privateRoutes } from './privateRoutes';
import ProtectedRoutes from './ProtectedRoutes';

export const getRoutes = () => {
  privateRoutes.map((r) => {
    r.element = <ProtectedRoutes route={r}>{r.element}</ProtectedRoutes>;
  });

  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  };
};
