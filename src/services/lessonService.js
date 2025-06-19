import { authInstance } from "./instance";

const lessonServices = {
  getStudentLessons: async () => {
    return await authInstance.get("/lessons/student");
  },
  getMentorLessons: async () => {
    return await authInstance.get("/lessons/mentor");
  },
  bookLesson: async (lessonData) => {
    return await authInstance.post("/lessons/book", lessonData);
  },
  scheduleZoomMeeting: async (lessonId) => {
    return await authInstance.post(`/meetings/schedule-lesson/${lessonId}`);
  },
  cancelLesson: async (lessonId) => {
    return await authInstance.delete(`/lessons/${lessonId}`);
  },
  getCompletedLessonsByCourse: async (courseId) => {
    return await authInstance.get(`/lessons/course/${courseId}/completed`);
  },
  getUpcomingLessonsByCourse: async (courseId) => {
    return await authInstance.get(`/lessons/course/${courseId}/upcoming`);
  },
  getLessonsByCourse: async (courseId) => {
    return await authInstance.get(`/lessons/course/${courseId}`);
  },
};

export default lessonServices;
