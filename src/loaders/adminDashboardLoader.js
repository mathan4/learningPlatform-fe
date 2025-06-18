// loaders/adminDashboardLoader.js
import { redirect } from "react-router-dom";
import authService from "../services/authServices";
import mentorServices from "../services/mentorServices";
import userService from "../services/userService";
import courseService from "../services/courseService";

export const adminDashboardLoader = async () => {
  try {
    const user = await authService.me();
    console.log(user)
    if (!user || user.data.role !== "admin") {
      return redirect("/login");
    }

    const [users, mentorRequests, courses] = await Promise.all([
      userService.getAllUsers(),
      mentorServices.getMentorRequests(),
      courseService.getAllCourses()
    ]);

    // compute basic stats
    const userCount = users.length;
    const mentorCount = users.filter(u => u.role === "mentor").length;
    const courseCount = courses.data.length;

    const stats = {
      userCount,
      mentorCount,
      courseCount,
    };

   

    return { user, users, mentorRequests, courses, stats };
  } catch (error) {
    console.error("Admin Dashboard Loader Error:", error);
    return redirect("/login");
  }
};
