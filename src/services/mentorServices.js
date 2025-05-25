import { authInstance } from "./instance";

const mentorServices = {
  getMentors: async () => {
    return await authInstance.get('/mentors');
  },
   getAllMentors: async (queryParams) => {
    const response = await authInstance.get(`/mentors${queryParams}`);
    return response.data;
  },
};

export default mentorServices;
