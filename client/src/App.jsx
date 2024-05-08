import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import PropertyList from "./components/PropertyList/PropertyList";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AboutUs />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route
          path="/profile"
          element={<p>to be added when profile page is ready</p>}
        />
      </Routes>
    </>
  );
};

export default App;
