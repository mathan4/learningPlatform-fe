import { useEffect, useState } from "react";
import mentorServices from "../services/mentorServices";

const MentorRequestList = ({ mentorRequests: initialRequests }) => {
  const [mentorRequests, setMentorRequests] = useState(initialRequests || []);
  const baseURL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    setMentorRequests(initialRequests || []);
  }, [initialRequests]);

  const refreshRequests = async () => {
    try {
      const updatedRequests = await mentorServices.getMentorRequests();
      setMentorRequests(updatedRequests);
    } catch (error) {
      console.error("Failed to refresh mentor requests:", error);
    }
  };

  const handleApproveClick = async (requestId) => {
    try {
      await mentorServices.updateMentorRequestStatus(requestId, "approved");
      await refreshRequests();
    } catch (error) {
      console.error("Error approving mentor request:", error);
      alert("Failed to approve mentor request.");
    }
  };

  const handleRejectClick = async (requestId) => {
    try {
      await mentorServices.updateMentorRequestStatus(requestId, "rejected");
      await refreshRequests();
    } catch (error) {
      console.error("Error rejecting mentor request:", error);
      alert("Failed to reject mentor request.");
    }
  };

  // More robust empty state checking
  const isEmptyRequests = () => {
    if (!mentorRequests) return true;
    if (!Array.isArray(mentorRequests)) return true;
    if (mentorRequests.length === 0) return true;

    // Handle case where you receive [Array(0)] - an array containing empty arrays
    if (
      mentorRequests.length === 1 &&
      Array.isArray(mentorRequests[0]) &&
      mentorRequests[0].length === 0
    ) {
      return true;
    }

    // Filter out any null/undefined items and check if any valid requests remain
    const validRequests = mentorRequests.filter(
      (request) => request && typeof request === "object"
    );
    return validRequests.length === 0;
  };

  if (isEmptyRequests()) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No mentor requests available.
      </div>
    );
  }

  // Flatten and filter the requests in case of nested arrays
  const flattenedRequests =
    Array.isArray(mentorRequests[0]) && mentorRequests.length === 1
      ? mentorRequests[0]
      : mentorRequests;

  const validRequests = flattenedRequests.filter(
    (request) => request && typeof request === "object"
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Mentor Requests</h3>
      <ul className="space-y-2">
        {validRequests.map((request, index) => {
          // Safety check for populated userId
          const user = request.userId || {};

          return (
            <li
              key={request._id || index}
              className="p-3 bg-white/5 border rounded-md"
            >
              <p>
                <strong>Name:</strong> {user.firstName || "N/A"}{" "}
                {user.lastName || ""}
              </p>
              <p>
                <strong>Subjects:</strong>{" "}
                {request.subjects?.length > 0
                  ? request.subjects.map((subj, i) => (
                      <span key={i}>
                        {subj}
                        {i < request.subjects.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "None"}
              </p>
              <p>
                <strong>Experience:</strong> {request.experience || 0} years
              </p>
              <p>
                <strong>Status:</strong> {request.status || "Pending"}
              </p>
              {request.documents && request.documents.length > 0 && (
                <p>
                  <strong>Document:</strong>{" "}
                  <a
                    href={`${baseURL}/${request.documents[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </p>
              )}

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleApproveClick(request._id)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectClick(request._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MentorRequestList;
