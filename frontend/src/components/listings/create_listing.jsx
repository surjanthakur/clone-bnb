import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateListing() {
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    about: "",
    country: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/listings/create`, listing);
      alert("new listing created ✅");
      navigate("/");
    } catch (err) {
      alert("cant create listing ⚠️⚠️");
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            Edit Details
          </h2>

          {/* Title */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              onChange={handleChange}
              value={listing.title}
              placeholder="Enter title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              About
            </label>
            <textarea
              name="about"
              value={listing.about}
              onChange={handleChange}
              placeholder="Write something..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            ></textarea>
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Country
            </label>
            <input
              name="country"
              onChange={handleChange}
              value={listing.country}
              type="text"
              placeholder="Enter country"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Location
            </label>
            <input
              name="location"
              onChange={handleChange}
              value={listing.location}
              type="text"
              placeholder="Enter location"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
