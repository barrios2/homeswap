import React from "react";
import Nav from "../../components/Nav/Nav";
import PropertyList from "../../components/PropertyList/PropertyList";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <hr />
      <PropertyList />
      <hr />
      <Footer />
    </>
  );
};

export default Home;
