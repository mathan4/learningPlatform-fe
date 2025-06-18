import lessonServices from "../services/lessonService";
import mentorServices from "../services/mentorServices";
import courseService from "../services/courseService";

const userDashboardLoader = async () => {
  const [lessons, mentors, enrolledCourses] = await Promise.all([
    lessonServices.getStudentLessons(),
    mentorServices.getMentors(),
    courseService.getEnrolledCourse(), 
  ]);

  return {
    lessons: lessons.data,
    mentors: mentors.data,
    courses: enrolledCourses.data, 
  };
};

export default userDashboardLoader;
