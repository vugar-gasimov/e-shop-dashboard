import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  if (role) {
    if (route.role) {
      if (userInfo) {
        if (userInfo.role === route.role) {
          if (route.status) {
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === 'pending') {
                return <Navigate to='/vendor/account-pending' replace />;
              } else {
                return <Navigate to='/vendor/account-deactive' replace />;
              }
            }
          } else {
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to='/vendor/account-pending' replace />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          return <Navigate to='/unauthorized' replace />;
        }
      }
    } else {
      if (route.ability === 'vendor') {
        return <Suspense fallback={null}>{children}</Suspense>;
      }
    }
  } else {
    return <Navigate to='/login' replace />;
  }
};

export default ProtectedRoutes;
