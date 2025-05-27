import userService from '../services/userService';

const AdminUserList = ({ users }) => {
  // Function to handle the deletion of a user
  const handleDeleteUser = async (userId) => {
    try {
      // Confirm with the user before deleting
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        await userService.deleteUserById(userId);
        users = await userService.getAllUsers();
       
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Optionally, show an error message to the user
      alert("Failed to delete user. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">All Users</h3>
      <ul className="space-y-2">
        {users.map(user => (
          <li key={user._id} className="p-2 bg-white/5 border rounded-md flex justify-between items-center">
            <div>
              {user.firstName} {user.lastName} - {user.email} ({user.role})
            </div>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUserList;