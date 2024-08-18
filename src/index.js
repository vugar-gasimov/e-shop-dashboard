import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import store from './store/index';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              background: '#4c51bf',
              color: '#f1f5f9',
            },
          }}
        />
      </Suspense>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
