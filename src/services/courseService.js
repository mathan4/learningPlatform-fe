import { authInstance, fileInstance } from "./instance";

const courseService = {
  // Used by mentors to create a course (with files)
  createCourse: async (data) => {
    const response = await fileInstance.post("/courses/create", data);
    return response;
  },

  // Get all courses (for students or general listing)
  getAllCourses: async () => {
    const response = await authInstance.get("/courses");
    return response.data;
  },

  // Get details of a specific course by ID
  getCourseById: async (id) => {
    const response = await authInstance.get(`/courses/${id}`);
    return response.data;
  },

  // Get the courses created by the currently logged-in mentor
  getMentorCourses: async () => {
    const response = await authInstance.get("/courses/mentor");
    return response.data;
  },

  // Enroll in a course by ID
  enrollInCourse: async (id) => {
    const response = await authInstance.post(`/courses/enroll/${id}`);

    return response.data;
  },

  // Fetch the list of course IDs the user is already enrolled in
  getEnrolledCourse: async () => {
    const response = await authInstance.get("/courses/enrolledCourses");
    return response.data;
  },

  // Cancel enrollment by course ID
  cancelEnrollment: async (courseId) => {
    try {
      const response = await authInstance.delete(`/courses/enroll/${courseId}`);
      return response;
    } catch (error) {
      console.error("Cancel enrollment error:", error);
      throw error;
    }
  },

  // Cancel enrollment by enrollment ID (for pending payments)
  cancelEnrollmentById: async (enrollmentId) => {
    try {
      const response = await authInstance.delete(
        `/courses/enroll/${enrollmentId}`
      );
      return response;
    } catch (error) {
      console.error("Cancel enrollment by ID error:", error);
      throw error;
    }
  },
  
};

export default courseService;
