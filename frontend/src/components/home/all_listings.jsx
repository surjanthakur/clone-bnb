import { useState, useEffect } from "react";
import axios from "axios";

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
        <h1>all listings</h1>
        <div className="mb-2 mt-2">
          <ul>
            {listings.map((list) => (
              <li key={list.id} className="text-black-700">
                {list.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
