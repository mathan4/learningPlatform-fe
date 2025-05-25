import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setFirstName,
  setLastName,
  setLocation,
  setLanguagesKnown,
  setProfilePicture,
  setUserProfile,
} from "../../redux/features/userSlice";
import userService from "../../services/userService";
import { toast } from "react-toastify";
import authServices from "../../services/authServices";

const UserProfile = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(user.profilePicture || null);
  const fileInputRef = useRef(null);
  console.log(user);
  useEffect(() => {
    if (user.firstName == "") {
      fetchUser();
    }
  }, [user]);
  const fetchUser = async () => {
    const userDetails = await authServices.me();

    const userData = userDetails.data;
    dispatch(
      setUserProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email || "",
        location: userData.location || "",
        profilePicture: userData.profilePicture || "",
        languagesKnown: userData.languagesKnown || [],
      })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        dispatch(setFirstName(value));
        break;
      case "lastName":
        dispatch(setLastName(value));
        break;
      case "location":
        dispatch(setLocation(value));
        break;
      case "languagesKnown":
        dispatch(
          setLanguagesKnown(value.split(",").map((lang) => lang.trim()))
        );
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target.result;
      setImagePreview(imageData); // just for preview
    };

    reader.readAsDataURL(file);
    dispatch(setProfilePicture(file)); // save File object
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      const updatedUserData = {
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        languagesKnown: user.languagesKnown,
        profilePicture: user.profilePicture,
      };

      const result = await userService.updateUserProfile(updatedUserData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("An error occurred while saving your profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-celestialBlue to-africanViolet text-transparent bg-clip-text mb-8">
          User Profile
        </h2>

        <div className="flex flex-col items-center mb-8">
          {imagePreview || user.profilePicture ? (
            <img
              src={imagePreview || user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-celestialBlue shadow-md"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-africanViolet flex items-center justify-center text-white text-4xl font-bold">
              {user.firstName ? user.firstName.charAt(0).toUpperCase() : "?"}
            </div>
          )}

          {isEditing && (
            <div className="mt-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={triggerFileInput}
                className="bg-celestialBlue text-white px-4 py-2 mt-2 rounded hover:bg-indigoCustom transition"
              >
                Choose Photo
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        {[
          { label: "First Name", name: "firstName", value: user.firstName },
          { label: "Last Name", name: "lastName", value: user.lastName },
          { label: "Location", name: "location", value: user.location || "" },
          {
            label: "Languages Known",
            name: "languagesKnown",
            value: user.languagesKnown?.join(", ") || "",
            placeholder: "Enter languages separated by commas",
          },
        ].map(({ label, name, value, placeholder }) => (
          <div className="mb-4" key={name}>
            <label className="block text-white font-medium mb-1">{label}</label>
            {isEditing ? (
              <input
                type="text"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-celestialBlue"
              />
            ) : (
              <p className="text-white/90">{value || "N/A"}</p>
            )}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-white font-medium mb-1">Email</label>
          <p className="text-white/90">{user.email}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className={`px-4 py-2 rounded-lg font-semibold text-white transition ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-celestialBlue hover:bg-indigoCustom"
            }`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
