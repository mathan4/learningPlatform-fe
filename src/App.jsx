import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import authLoader from "./loaders/authLoader";
import userDashboardLoader from "./loaders/userDashboardLoader";
import { adminDashboardLoader } from "./loaders/adminDashboardLoader";
import { mentorDashboardLoader } from "./loaders/mentorDashboardLoader";
import { Provider } from "react-redux";
import store from "./redux/app/store";

// Lazy loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LayoutWrapper = lazy(() => import("./wrappers/LayoutWrapper"));
const DashboardWrapper = lazy(() => import("./wrappers/DashboardWrapper"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const UserProfile = lazy(() => import("./pages/user/UserProfile"));
const BrowseMentor = lazy(() => import("./pages/user/BrowseMentor"));
const MentorRequestForm = lazy(() => import("./components/MentorRequestForm"));
const AdminDashboardWrapper = lazy(() => import("./wrappers/AdminDashboardWrapper"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const MentorDashboardWrapper = lazy(() => import("./wrappers/MentorDashboardWrapper"));
const MentorDashboard = lazy(() => import("./pages/mentor/MentorDashboard"));
const Logout = lazy(() => import("./components/Logout"));
const ToastProvider = lazy(() => import("./components/ToastProvider"));
const PaymentSuccess = lazy(() => import("./components/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./components/PaymentCancel"));
const PaymentSuccessCourse = lazy(() => import("./components/PaymentSuccessCourse"));
const PaymentCancelCourse = lazy(() => import("./components/PaymentCancelCourse"));
const CourseList = lazy(() => import("./pages/user/CourseList"));
const CourseDetail = lazy(() => import("./pages/user/CourseDetails"));
const ViewClasses = lazy(() => import("./pages/user/ViewClasses"));

// Define routes
const routes = [
  {
    path: "/",
    element: <LayoutWrapper />,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    id: "dashboard",
    path: "/dashboard",
    element: <DashboardWrapper />,
    loader: authLoader,
    hydrateFallbackElement: <div>Loading Dashboard...</div>,
    children: [
      { index: true, loader: userDashboardLoader, element: <UserDashboard /> },
      { path: "userProfile", element: <UserProfile />, loader: authLoader },
      { path: "Mentors", element: <BrowseMentor /> },
      { path: "MentorRequest", element: <MentorRequestForm /> },
      { path: "courses", element: <CourseList /> },
      { path: "courses/:courseId", element: <CourseDetail /> },
      { path: "courses/:courseId/classes", element: <ViewClasses /> },
    ],
  },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/payment-cancel", element: <PaymentCancel /> },
  { path: "/course-payment-success", element: <PaymentSuccessCourse /> },
  { path: "/course-payment-cancel", element: <PaymentCancelCourse /> },
  {
    path: "/admin/dashboard",
    element: <AdminDashboardWrapper />,
    loader: authLoader,
    children: [
      { index: true, loader: adminDashboardLoader, element: <AdminDashboard /> },
    ],
  },
  {
    path: "mentor",
    element: <MentorDashboardWrapper />,
    loader: authLoader,
    children: [
      { index: true, loader: mentorDashboardLoader, element: <MentorDashboard /> },
      { path: "profile", element: <UserProfile />, loader: authLoader },
    ],
  },
  { path: "logout", element: <Logout /> },
];

// Create router
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

// App with Suspense wrapper
const App = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><span className="loader" /></div>}>
        <ToastProvider />
        <RouterProvider
          router={router}
          future={{ v7_startTransition: true }}
        />
      </Suspense>
    </Provider>
  );
};

export default App;
