import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import authLoader from "./loaders/authLoader";
import LayoutWrapper from "./wrappers/LayoutWrapper";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ToastProvider from "./components/ToastProvider";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import UserDashboard from "./pages/user/UserDashboard";
import DashboardWrapper from "./wrappers/DashboardWrapper";
import userDashboardLoader from "./loaders/userDashboardLoader";
import UserProfile from "./pages/user/UserProfile";
import Logout from "./components/Logout";
import BrowseMentor from "./pages/user/BrowseMentor";
import MentorRequestForm from "./components/MentorRequestForm";
import AdminDashboardWrapper from "./wrappers/AdminDashboardWrapper";
import { adminDashboardLoader } from "./loaders/adminDashboardLoader";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import MentorDashboardWrapper from "./wrappers/MentorDashboardWrapper";
import { mentorDashboardLoader } from "./loaders/mentorDashboardLoader";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

const routes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    id: "dashboard",
    path: "/dashboard",
    element: <DashboardWrapper />,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading Dashboard...</div>,
    children: [
      {
        index: true,
        loader: userDashboardLoader,
        element: <UserDashboard />,
      },
      {
        path: "userProfile",
        element: <UserProfile />,
        loader: authLoader,
        hydrateFallbackElement: <div>Loading user profile...</div>,
      },
      {
        path: "Mentors",
        element: <BrowseMentor />,
        hydrateFallbackElement: <div>Loading Mentors...</div>,
      },
      {
        path: "MentorRequest",
        element: <MentorRequestForm />,
        hydrateFallbackElement: <div>Loading form...</div>,
      },
    ],
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-cancel",
    element: <PaymentCancel />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardWrapper />,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading Admin Dashboard...</div>,
    children: [
      {
        index: true,
        loader: adminDashboardLoader,
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "mentor",
    element: <MentorDashboardWrapper />,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading Mentor Dashboard...</div>,
    children: [
      {
        index: true,
        loader: mentorDashboardLoader,
        element: <MentorDashboard />,
      },
      {
        path: "profile",
        element: <UserProfile />,
        loader: authLoader,
        hydrateFallbackElement: <div>Loading user profile...</div>,
      },
    ],
  },
  {
    path: "logout",
    element: <Logout />,
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
  return (
    <>
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
  );
};

export default App;
