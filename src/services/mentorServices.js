import { a } from "framer-motion/client";
import { authInstance } from "./instance";

const mentorServices = {
  getMentors: async () => {
    const response = await authInstance.get('/mentors');
    return response.data;
  },
   getAllMentors: async (queryParams) => {
    const response = await authInstance.get(`/mentors${queryParams}`);
    return response.data;
  },
  getMentorEarnings:async () => {
    const response = await authInstance.get('/mentors/earnings');
    return response.data;
  },
  getMentorRequests: async () => {
     const response = await authInstance.get('/users/mentorRequest');
     return response.data;
  },
  updateMentorRequestStatus: async (id, status) => {
    const res = await authInstance.patch(`/users/mentorRequestUpdate/${id}`, { status });
    return res.data;
  },
};

export default mentorServices;
