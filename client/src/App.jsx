import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import LogInProvider from "./context/LogInProvider/LogInProvider";
import ProtectedProfile from "./components/ProtectedRoute/ProtectedProfile";
import ViewProperty from "./components/ViewProperty/ViewProperty";
import UploadPropertyPage3 from "./pages/UploadProperty3/UploadProperty3";

const App = () => {
  return (
    <LogInProvider>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/property/view/:id" element={<ViewProperty />} />
        <Route
          path="/property/uploadproperty3"
          element={<UploadPropertyPage3 />}
        />
        <Route path="/" element={<AboutUs />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        <Route element={<ProtectedProfile />}>
          <Route
            path="/profile"
            element={
              <p style={{ color: "yellow" }}>
                to be added when profile page is ready
              </p>
            }
          />
        </Route>
      </Routes>
    </LogInProvider>
  );
};

export default App;
