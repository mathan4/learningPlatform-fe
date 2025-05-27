import lessonServices from "../services/lessonService";
import mentorServices from "../services/mentorServices";

export const mentorDashboardLoader = async () => {
  try {
    // Get all mentor's lessons with proper error handling
    let allLessons = [];
    let totalEarnings = 0;

    try {
      const lessonResponse = await lessonServices.getMentorLessons();
      // Handle different response structures
      allLessons = lessonResponse?.data || lessonResponse || [];
    } catch (lessonError) {
      console.warn("Failed to fetch lessons:", lessonError);
      // Don't throw error, just log and continue with empty array
      allLessons = [];
    }

    // Ensure allLessons is an array
    if (!Array.isArray(allLessons)) {
      console.warn("Lessons data is not an array, defaulting to empty array");
      allLessons = [];
    }

    // Filter lessons safely
    const upcomingLessons = allLessons.filter(
      (lesson) => lesson?.status === "scheduled" || lesson?.status === "accepted"
    );

    const completedLessons = allLessons.filter(
      (lesson) => lesson?.status === "completed"
    );

    const pendingLessons = allLessons.filter(
      (lesson) => lesson?.status === "pending"
    );

    // Get mentor's total earnings with error handling
    try {
      const earningsResponse = await mentorServices.getMentorEarnings();

      totalEarnings = earningsResponse?.totalEarnings|| 0;
    } catch (earningsError) {
      console.warn("Failed to fetch earnings:", earningsError);
      totalEarnings = 0;
    }

    // Ensure totalEarnings is a number
    if (typeof totalEarnings !== 'number' || isNaN(totalEarnings)) {
      totalEarnings = 0;
    }

    // Return structured data with fallbacks
    return {
      allLessons,
      upcomingLessons,
      completedLessons,
      pendingLessons,
      totalEarnings,
      stats: {
        totalLessons: allLessons.length,
        upcomingCount: upcomingLessons.length,
        completedCount: completedLessons.length,
        pendingCount: pendingLessons.length,
        hasLessons: allLessons.length > 0,
        hasEarnings: totalEarnings > 0
      }
    };
  } catch (error) {
    console.error("Critical error loading mentor dashboard data:", error);
    
    // Return empty state instead of throwing error
    return {
      allLessons: [],
      upcomingLessons: [],
      completedLessons: [],
      pendingLessons: [],
      totalEarnings: 0,
      stats: {
        totalLessons: 0,
        upcomingCount: 0,
        completedCount: 0,
        pendingCount: 0,
        hasLessons: false,
        hasEarnings: false
      },
      error: "Failed to load dashboard data. Please try refreshing the page."
    };
  }
};