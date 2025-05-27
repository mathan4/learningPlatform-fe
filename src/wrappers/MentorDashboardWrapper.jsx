import React from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../components/NavBarComponent"; // Update if NavBar path differs

const MentorDashboardWrapper = () => {
  const loadedData = useLoaderData(); // Should return user object
  const user = loadedData;

  const isNotMentor = !user || user.user.role !== "mentor";

  if (isNotMentor) {
    console.log("MentorDashboardWrapper: Redirecting non-mentor or unauthenticated user to login.");
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavBar user={loadedData} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MentorDashboardWrapper;
