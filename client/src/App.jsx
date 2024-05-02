import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/profile"
          element={<p>to be added when profile page is ready</p>}
        />
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
