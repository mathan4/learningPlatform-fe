import lessonServices from "../services/lessonService";
import mentorServices from "../services/mentorServices";

const userDashboardLoader = async () => {
  const [lessons, mentors] = await Promise.all([
    lessonServices.getStudentLessons(),
    mentorServices.getMentors()
  ]);
   console.log(lessons.data);
   console.log(mentors.data);
  return {
    lessons: lessons.data,
    mentors: mentors.data
  };
};

export default userDashboardLoader;
