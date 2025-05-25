import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import authLoader from './loaders/authLoader';
import LayoutWrapper from './wrappers/LayoutWrapper';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ToastProvider from './components/ToastProvider';
import { Provider } from 'react-redux';
import store from './redux/app/store';
import UserDashboard from './pages/user/UserDashboard';
import DashboardWrapper from './wrappers/DashboardWrapper';
import userDashboardLoader from './loaders/userDashboardLoader';
import UserProfile from './pages/user/UserProfile';
import Logout from './components/Logout';
import BrowseMentor from './pages/user/BrowseMentor';
import { path } from 'framer-motion/client';
import MentorRequestForm from './components/MentorRequestForm';


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
  {
    path: "/dashboard",
    element: <DashboardWrapper/>,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading Dashboard...</div>,
    children: [
      {
        index: true,
        loader:userDashboardLoader,
        element: <UserDashboard/>
      },
      {
        path: "userProfile",
        element: <UserProfile/>,
        loader: authLoader,
        hydrateFallbackElement: <div>Loading user profile...</div>,
      },
      {
        path:"Mentors",
        element:<BrowseMentor/>,
        hydrateFallbackElement: <div>Loading Mentors...</div>,

      },
      {
        path:"MentorRequest",
        element:<MentorRequestForm/>,
        hydrateFallbackElement: <div>Loading form...</div>,
      },
      {
        path:"logout",
        element:<Logout/>
      }
      // {
      //   path: "applications",
      //   element: <Applications />,
      //   loader: jobsLoader,
      //   hydrateFallbackElement: <div>Loading Applications...</div>,
      // },
      // {
      //   path: "logout",
      //   element: <Logout />
      // }
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