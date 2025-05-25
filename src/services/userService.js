import { fileInstance } from "./instance";

const userService = {
  updateUserProfile: async (userData) => {
    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("location", userData.location);
    formData.append("languagesKnown", JSON.stringify(userData.languagesKnown));

    if (userData.profilePicture instanceof File) {
      formData.append("profilePicture", userData.profilePicture);
    }

    const response = await fileInstance.put("/users/updateProfile", formData);
    return response.data;
  },

  submitMentorRequest: async (mentorData) => {
    const formData = new FormData();
    formData.append("experience", mentorData.experience);
    formData.append("hourlyRate", mentorData.hourlyRate);
    formData.append("bio", mentorData.bio);
    formData.append("qualifications", JSON.stringify(mentorData.qualifications));
    formData.append("subjects", JSON.stringify(mentorData.subjects));
    formData.append("availability", JSON.stringify(mentorData.availability));

    if (Array.isArray(mentorData.documents)) {
      mentorData.documents.forEach((doc) => {
        if (doc instanceof File) {
          formData.append("documents", doc);
        }
      });
    }

    const response = await fileInstance.post("/mentorRequest", formData);
    return response.data;
  },
};

export default userService;
