import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Listing() {
  const { id } = useParams();
  const [listing, setListing] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.log("cant get id:", err));
  }, []);
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Listing by id</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold mb-2 text-blue-700">
              {listing.title}
            </h2>
            <p className="text-green-600 mb-1">about: {listing.about}</p>
            <p className="text-black-500 text-sm">
              <span className="font-medium">Country:</span> {listing.country}
            </p>
            <p className="text-red-500 text-sm">
              <span className="font-medium">Location:</span> {listing.location}
            </p>
            <Link to={`/listing/${listing.id}/update`}>
              <button className="text-pink-600 mt-5">edit</button>
            </Link>
            <button className="text-black-800 ml-5">delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
