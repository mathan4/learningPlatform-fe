import { authInstance } from "./instance";

const lessonServices = {
  getStudentLessons: async () => {
    return await authInstance.get('/lessons/student');
  },
  bookLesson: async (lessonData) => {
    return await authInstance.post('/lessons/book', lessonData);
  },
  cancelLesson: async (lessonId) => {
    return await authInstance.delete(`/lessons/${lessonId}`);
  },
};

export default lessonServices;
