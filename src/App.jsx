import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import NavBarComponent from './components/NavBarComponent';
import authLoader from './loaders/authLoader';
import LayoutWrapper from './wrappers/LayoutWrapper';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ToastProvider from './components/ToastProvider';
import { Provider } from 'react-redux';
import store from './redux/app/store';


const routes = [
 {
    path: '/',
    element: <LayoutWrapper/>,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "register",
        element: <RegisterPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      }
    ]
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const App = () => {
  return <>
    <Provider store={store}>
      <ToastProvider />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Provider>
    
  </>
}

export default App;