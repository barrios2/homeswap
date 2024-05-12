import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogInProvider from "./context/LogInProvider/LogInProvider";
// import ViewPropertyDetailsPage from "./pages/ViewProperty/ViewProperty";
import ViewProperty from "./components/ViewProperty/ViewProperty";

const App = () => {
  return (
    <LogInProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/property/view/:id" element={<ViewProperty />} />
        {/* <Route path="/property/view/:id" element={< ViewPropertyDetailsPage />} /> */}
        <Route path="/" element={<AboutUs />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route
          path="/profile"
          element={<p>to be added when profile page is ready</p>}
        />
      </Routes>
    </LogInProvider>
  );
};

export default App;
