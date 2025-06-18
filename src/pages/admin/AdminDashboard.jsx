import { useLoaderData } from "react-router-dom";
import AdminUserList from "../../components/AdminUserList";
import MentorRequestList from "../../components/MentorRequestList";
import StatsCard from "../../components/StatsCard";
import AdminCourseTable from "../../components/AdminCourseTable";

const AdminDashboard = () => {
  const { user, users, mentorRequests, stats, courses } = useLoaderData();

  const course=courses.data
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
        Welcome, Admin {user.firstName}
      </h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Users" value={stats.userCount} />
        <StatsCard title="Total Mentors" value={stats.mentorCount} />
        <StatsCard title="Total Courses" value={stats.courseCount} />
      </div>

      {/* Users and Mentor Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">User List</h3>
          <AdminUserList users={users} />
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Mentor Requests</h3>
          <MentorRequestList mentorRequests={Array.isArray(mentorRequests) ? mentorRequests : [mentorRequests]} />
        </div>
      </div>

      {/* Course Management */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Manage Courses</h3>
        <AdminCourseTable courses={course} />
      </div>
    </div>
  );
};

export default AdminDashboard;