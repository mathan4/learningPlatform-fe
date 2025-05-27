import { Navigate, Outlet, useLoaderData } from "react-router-dom"; // CORRECTED: import from 'react-router-dom'
import NavBar from "../components/NavBarComponent"; // Ensure this path is correct

const DashboardWrapper = () => {
  // authLoader returns an object like { user: { role: 'student', ... } } or { user: { role: 'mentor', ... } }
  const loadedData = useLoaderData(); // This will be the { user: {...} } object
  const user = loadedData?.user; // Access the actual user object within the loaded data

  if (!user) {
    console.log("DashboardWrapper: Redirecting unauthenticated user to login.");
    return <Navigate to="/login" replace />;
  }


  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === 'mentor') {
   
    return <Navigate to="/mentor/dashboard" replace />;
  }

  
  return (
    <>
      {/* Pass the full loadedData object to NavBar if it expects { user: { ... } } structure */}
      <NavBar user={loadedData} />
      <Outlet />
    </>
  );
};

export default DashboardWrapper;