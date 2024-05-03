import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
// import Nav from "./components/Nav";
// import Home from "./pages/Home/Home";
// import CreateUser from "./pages/User/CreateUser";
// import UserList from "./pages/User/UserList";

const App = () => {
  return (
    <>
      {/* <Nav /> */}
      <Routes>
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<LogIn />} />
        {/* <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/create" element={<CreateUser />} /> */}
      </Routes>
    </>
  );
};

export default App;
