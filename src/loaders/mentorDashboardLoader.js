import courseService from "../services/courseService";
import lessonServices from "../services/lessonService";
import mentorServices from "../services/mentorServices";

export const mentorDashboardLoader = async () => {
  try {
    let allLessons = [];
    let totalEarnings = 0;
    let mentorCourses = [];

    try {
      const lessonResponse = await lessonServices.getMentorLessons();
      allLessons = Array.isArray(lessonResponse?.data) ? lessonResponse.data : [];
    } catch (lessonError) {
      console.warn("Failed to fetch lessons:", lessonError);
      allLessons = [];
    }

    if (!Array.isArray(allLessons)) {
      console.warn("Lessons data is not an array, defaulting to empty array");
      allLessons = [];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const upcomingLessonsToday = allLessons.filter((lesson) => {
      const startTime = new Date(lesson.startTime);
      return startTime >= today && startTime < tomorrow && (lesson.status === "scheduled" || lesson.status === "accepted");
    });

    const upcomingLessons = allLessons.filter(
      (lesson) => lesson?.status === "scheduled" || lesson?.status === "accepted"
    );

    const completedLessons = allLessons.filter(
      (lesson) => lesson?.status === "completed"
    );

    const pendingLessons = allLessons.filter(
      (lesson) => lesson?.status === "pending"
    );

    try {
      const earningsResponse = await mentorServices.getMentorEarnings();
      totalEarnings = earningsResponse?.totalEarnings || 0;
    } catch (earningsError) {
      console.warn("Failed to fetch earnings:", earningsError);
      totalEarnings = 0;
    }

    if (typeof totalEarnings !== "number" || isNaN(totalEarnings)) {
      totalEarnings = 0;
    }

    try {
      const res = await courseService.getMentorCourses();
      mentorCourses = Array.isArray(res?.data) ? res.data : [];
    } catch (courseError) {
      console.warn("Failed to fetch mentor courses:", courseError);
      mentorCourses = [];
    }

    const totalStudents = mentorCourses.reduce((sum, course) => {
      return sum + (course.enrolledStudents?.length || 0);
    }, 0);

    return {
      allLessons,
      upcomingLessons,
      completedLessons,
      pendingLessons,
      totalEarnings,
      mentorCourses,
      upcomingLessonsToday,
      stats: {
        totalLessons: allLessons.length,
        upcomingCount: upcomingLessons.length,
        completedCount: completedLessons.length,
        pendingCount: pendingLessons.length,
        todayCount: upcomingLessonsToday.length,
        hasLessons: allLessons.length > 0,
        hasEarnings: totalEarnings > 0,
        totalStudents,
      },
    };
  } catch (error) {
    console.error("Critical error loading mentor dashboard data:", error);
    return {
      allLessons: [],
      upcomingLessons: [],
      completedLessons: [],
      pendingLessons: [],
      totalEarnings: 0,
      mentorCourses: [],
      upcomingLessonsToday: [],
      stats: {
        totalLessons: 0,
        upcomingCount: 0,
        completedCount: 0,
        pendingCount: 0,
        todayCount: 0,
        hasLessons: false,
        hasEarnings: false,
        totalStudents: 0,
      },
      error: "Failed to load dashboard data. Please try refreshing the page.",
    };
  }
};
