import { redirect } from "react-router-dom";
import authService from "../services/authServices";
import mentorServices from "../services/mentorServices";
import userService from "../services/userService";

export const adminDashboardLoader = async () => {
  const user = await authService.me();

 
  const [users, mentorRequests] = await Promise.all([
    userService.getAllUsers(),
    mentorServices.getMentorRequests()
  ]);

  return { user, users, mentorRequests};
};