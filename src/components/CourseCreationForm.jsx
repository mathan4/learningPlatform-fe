import { useState } from "react";
import courseService from "../services/courseService";

const CourseCreationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    level: "Beginner",
    durationWeeks: "",
    durationHours: "",
    scheduleDays: [],
    startTime: "",
    endTime: "",
    sessionDuration: 60,
    totalPrice: "",
    paymentType: "full-upfront",
    enrollmentDeadline: "",
    maxStudents: 10,
    minStudents: 1,
    startDate: "",
    endDate: "",
    tags: "",
    isPublic: true,
    isFeatured: false,
    isPromoted: false,
    syllabus: [
      { week: 1, topics: [""], learningObjectives: [""], materials: [] },
    ],
  });

  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setFormData((prev) => ({ ...prev, scheduleDays: selected }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) return alert("Please upload a cover image.");

    const data = new FormData();
    
    // Basic fields
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("subject", formData.subject);
    data.append("level", formData.level);
    
    // Duration as JSON string (since server expects nested object)
    data.append("duration", JSON.stringify({
      weeks: formData.durationWeeks,
      totalHours: formData.durationHours
    }));
    
    // Schedule as JSON string
    data.append("schedule", JSON.stringify({
      daysOfWeek: formData.scheduleDays,
      classTime: {
        startTime: formData.startTime,
        endTime: formData.endTime
      },
      sessionDuration: formData.sessionDuration.toString()
    }));
    
    // Pricing as JSON string
    data.append("pricing", JSON.stringify({
      totalPrice: formData.totalPrice,
      paymentType: formData.paymentType
    }));
    
    // Enrollment settings as JSON string
    data.append("enrollmentSettings", JSON.stringify({
      enrollmentDeadline: formData.enrollmentDeadline,
      maxStudents: formData.maxStudents.toString(),
      minStudents: formData.minStudents.toString()
    }));
    
    // Timeline as JSON string
    data.append("timeline", JSON.stringify({
      startDate: formData.startDate,
      endDate: formData.endDate
    }));
    
    // Visibility as JSON string
    data.append("visibility", JSON.stringify({
      isPublic: formData.isPublic.toString(),
      isFeatured: formData.isFeatured.toString(),
      isPromoted: formData.isPromoted.toString()
    }));
    
    // Tags as JSON array
    const tagsArray = formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [];
    data.append("tags", JSON.stringify(tagsArray));
    
    // Course content as JSON string
    data.append("courseContent", JSON.stringify({
      syllabus: formData.syllabus
    }));
    
    // Cover image
    data.append("coverImage", coverImage);

    // Debug: Log FormData contents properly
    console.log("FormData contents:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      setLoading(true);
      setMsg(null);
      console.log("Sending course creation request...");
      const response = await courseService.createCourse(data);
      console.log("Course creation response:", response);
      setMsg("Course created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        subject: "",
        description: "",
        level: "Beginner",
        durationWeeks: "",
        durationHours: "",
        scheduleDays: [],
        startTime: "",
        endTime: "",
        sessionDuration: 60,
        totalPrice: "",
        paymentType: "full-upfront",
        enrollmentDeadline: "",
        maxStudents: 10,
        minStudents: 1,
        startDate: "",
        endDate: "",
        tags: "",
        isPublic: true,
        isFeatured: false,
        isPromoted: false,
        syllabus: [
          { week: 1, topics: [""], learningObjectives: [""], materials: [] },
        ],
      });
      setCoverImage(null);
      
      onSuccess?.();
    } catch (err) {
      console.error("Course creation failed:", err);
      console.error("Error response:", err.response?.data);
      setMsg(`Failed to create course: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-gray-900 text-white rounded shadow-lg"
    >
      <h2 className="text-xl font-bold">Create Course</h2>
      {msg && (
        <p className={`${msg.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
          {msg}
        </p>
      )}

      <label>
        Title
        <input
          name="title"
          placeholder="Course Title"
          onChange={handleChange}
          value={formData.title}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Subject
        <input
          name="subject"
          placeholder="Subject Area"
          onChange={handleChange}
          value={formData.subject}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          placeholder="Course Description"
          onChange={handleChange}
          value={formData.description}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Difficulty Level
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="w-full bg-gray-700 p-2 rounded mt-1"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </label>

      <label>
        Duration (weeks)
        <input
          type="number"
          name="durationWeeks"
          placeholder="Number of weeks"
          onChange={handleChange}
          value={formData.durationWeeks}
          required
          min="1"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Total Hours
        <input
          type="number"
          name="durationHours"
          placeholder="Total hours"
          onChange={handleChange}
          value={formData.durationHours}
          required
          min="1"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Class Days
        <select
          multiple
          value={formData.scheduleDays}
          onChange={handleMultiSelectChange}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        >
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </label>

      <label>
        Class Start and End Time
        <div className="flex gap-2 mt-1">
          <input
            type="time"
            name="startTime"
            onChange={handleChange}
            value={formData.startTime}
            required
            className="bg-gray-700 p-2 rounded w-full"
          />
          <input
            type="time"
            name="endTime"
            onChange={handleChange}
            value={formData.endTime}
            required
            className="bg-gray-700 p-2 rounded w-full"
          />
        </div>
      </label>

      <label>
        Session Duration (in minutes)
        <input
          type="number"
          name="sessionDuration"
          placeholder="Duration per session"
          onChange={handleChange}
          value={formData.sessionDuration}
          min="15"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Total Price
        <input
          type="number"
          name="totalPrice"
          placeholder="Course price"
          onChange={handleChange}
          value={formData.totalPrice}
          required
          min="0"
          step="0.01"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Payment Type
        <select
          name="paymentType"
          onChange={handleChange}
          value={formData.paymentType}
          className="w-full bg-gray-700 p-2 rounded mt-1"
        >
          <option value="full-upfront">Full Upfront</option>
          <option value="weekly">Weekly</option>
          <option value="per-session">Per Session</option>
        </select>
      </label>

      <label>
        Enrollment Deadline
        <input
          type="date"
          name="enrollmentDeadline"
          onChange={handleChange}
          value={formData.enrollmentDeadline}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Maximum Students
        <input
          type="number"
          name="maxStudents"
          placeholder="Max"
          onChange={handleChange}
          value={formData.maxStudents}
          min="1"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Minimum Students
        <input
          type="number"
          name="minStudents"
          placeholder="Min"
          onChange={handleChange}
          value={formData.minStudents}
          min="1"
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Start Date
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          value={formData.startDate}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        End Date
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          value={formData.endDate}
          required
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <label>
        Tags (comma-separated)
        <input
          type="text"
          name="tags"
          placeholder="E.g., programming, frontend, react"
          value={formData.tags}
          onChange={handleChange}
          className="w-full bg-gray-700 p-2 rounded mt-1"
        />
      </label>

      <fieldset className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
          />
          Public
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPromoted"
            checked={formData.isPromoted}
            onChange={handleChange}
          />
          Promoted
        </label>
      </fieldset>

      <label>
        Cover Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="text-white mt-1"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 p-2 w-full rounded mt-2"
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </form>
  );
};

export default CourseCreationForm;