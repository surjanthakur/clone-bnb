import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/all_listings";
import Listing from "./components/listings/get_listings";
import EditForm from "./components/listings/edit_form";
import CreateListing from "./components/listings/create_listing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/listing/create" element={<CreateListing />}></Route>
          <Route path="/listing/:id" element={<Listing />}></Route>
          <Route path="/listing/:id/update" element={<EditForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
