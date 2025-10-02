import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/all_listings";
import Listing from "./components/listings/get_listings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/listing/:id" element={<Listing />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
