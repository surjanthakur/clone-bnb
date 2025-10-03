import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/listings")
      .then((res) => {
        console.log(res.data);
        setListings(res.data);
      })
      .catch((err) => console.log("cant fetch listings: ", err));
  }, []);
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">All Listings</h1>
        <Link to="/listing/create">
          {" "}
          <h2>create new listing</h2>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((list) => (
            <Link to={`/listing/${list.id}`}>
              <div
                key={list.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2 text-blue-700">
                  {list.title}
                </h2>
                <p className="text-green-600 mb-1">about: {list.about}</p>
                <p className="text-black-500 text-sm">
                  <span className="font-medium">Country:</span> {list.country}
                </p>
                <p className="text-red-500 text-sm">
                  <span className="font-medium">Location:</span> {list.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
