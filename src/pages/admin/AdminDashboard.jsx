import { useLoaderData } from "react-router-dom";
import AdminUserList from "../../components/AdminUserList";
import MentorRequestList from "../../components/MentorRequestList";

const AdminDashboard = () => {
  const { user, users, mentorRequests } = useLoaderData();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Welcome Admin {user.firstName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminUserList users={users} />
        <MentorRequestList mentorRequests={[mentorRequests]} />
      </div>
    </div>
  );
};

export default AdminDashboard;