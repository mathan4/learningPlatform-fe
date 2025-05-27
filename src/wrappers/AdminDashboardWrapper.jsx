import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBarComponent"; // Ensure this path is correct

const AdminDashboardWrapper = () => {
  const loadedData = useLoaderData(); // This will be the { user: {...} } object
  const user = loadedData; // Because authLoader just returns the user


  const isNotAdmin = !user || user.user.role !== "admin";

  if (isNotAdmin) {
    console.log("AdminDashboardWrapper: Redirecting non-admin or unauthenticated user to login.");
    return <Navigate to="/login" replace />; // Use replace to prevent back navigation to a restricted page
  }

  return (
    <>
      {/* Pass the full loadedData object to NavBar if it expects { user: { ... } } structure */}
      <NavBar user={loadedData} />
      <main className="p-6">
        <Outlet />
      </main>
    </>
  );
};

export default AdminDashboardWrapper;