import { useState } from "react";
import userService from "../services/userService";

const initialQualification = { degree: "", institution: "", year: "" };
const initialAvailability = { day: "", startTime: "", endTime: "" };

const MentorRequestForm = () => {
  const [qualifications, setQualifications] = useState([initialQualification]);
  const [subjects, setSubjects] = useState([]);
  const [availability, setAvailability] = useState([initialAvailability]);
  const [experience, setExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleQualificationChange = (index, field, value) => {
    const updated = [...qualifications];
    updated[index][field] = value;
    setQualifications(updated);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleFileChange = (e) => {
    setDocuments([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    // Add 'e' as a parameter
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const mentorData = {
        experience,
        hourlyRate,
        bio,
        qualifications,
        subjects,
        availability,
        documents,
      };
      await userService.submitMentorRequest(mentorData);
      alert("Mentor request submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    //

    <form
      onSubmit={handleSubmit}
      // Apply MentorCard's outer div styling
      className=" bg-gradient-to-br from-gray-900 via-purple-900 to-black "
    >
      <div className="max-w-3xl mx-auto bg-white/10 border border-africanViolet p-5 rounded-2xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold bg-gradient-to-b from-white to-gray-300 text-transparent bg-clip-text text-indigoCustom mb-2">
          Mentor Request Form
        </h2>

        {/* Qualifications */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Qualifications
          </label>
          {qualifications.map((q, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Degree"
                value={q.degree}
                onChange={(e) =>
                  handleQualificationChange(i, "degree", e.target.value)
                }
                className="input bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
              />
              <input
                type="text"
                placeholder="Institution"
                value={q.institution}
                onChange={(e) =>
                  handleQualificationChange(i, "institution", e.target.value)
                }
                className="input bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
              />
              <input
                type="number"
                placeholder="Year"
                value={q.year}
                onChange={(e) =>
                  handleQualificationChange(i, "year", e.target.value)
                }
                className="input bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setQualifications([...qualifications, initialQualification])
            }
            className="text-celestialBlue hover:text-africanViolet text-sm mt-1"
          >
            + Add Qualification
          </button>
        </div>

        {/* Subjects */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Subjects (comma separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Mathematics, Physics"
            value={subjects.join(", ")}
            onChange={(e) =>
              setSubjects(e.target.value.split(",").map((s) => s.trim()))
            }
            className="input w-full bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Availability
          </label>
          {availability.map((a, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <select
                value={a.day}
                onChange={(e) =>
                  handleAvailabilityChange(i, "day", e.target.value)
                }
                className="w-full bg-gray-800 text-white border border-africanViolet rounded-md p-2"
              >
                <option value="">Select Day</option>
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <input
                type="time"
                value={a.startTime}
                onChange={(e) =>
                  handleAvailabilityChange(i, "startTime", e.target.value)
                }
                className="input bg-white/5 border border-africanViolet text-white/75 rounded-md p-2"
              />
              <input
                type="time"
                value={a.endTime}
                onChange={(e) =>
                  handleAvailabilityChange(i, "endTime", e.target.value)
                }
                className="input bg-white/5 border border-africanViolet text-white/75 rounded-md p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setAvailability([...availability, initialAvailability])
            }
            className="text-celestialBlue hover:text-africanViolet text-sm mt-1"
          >
            + Add Slot
          </button>
        </div>

        {/* Experience */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Experience (in years)
          </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input w-full bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
          />
        </div>

        {/* Hourly Rate */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="input w-full bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input w-full h-24 bg-white/5 border border-africanViolet text-white/75 placeholder-white/50 rounded-md p-2"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="font-semibold block mb-2 text-africanViolet">
            Documents (PDF/Images)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="input bg-white/5 border border-africanViolet text-white/75 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          // Apply MentorCard's button styling
          className="bg-celestialBlue hover:bg-africanViolet text-white font-medium px-4 py-2 rounded-lg transition"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
};

export default MentorRequestForm;
