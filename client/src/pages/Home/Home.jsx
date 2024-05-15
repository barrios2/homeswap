import React, { useState } from "react";
import Nav from "../../components/Nav/Nav";
import PropertyList from "../../components/PropertyList/PropertyList";
import Footer from "../../components/Footer/Footer";
import SearchBar from "./Search/SearchBar";
import SearchResults from "./Search/SearchResults";

const Home = () => {
  const [searchParams, setSearchParams] = useState(null);
  return (
    <>
      <Nav />
      <hr />
      <SearchBar setSearchParams={setSearchParams} />
      <SearchResults searchParams={searchParams} />
      <PropertyList />
      <hr />
      <Footer />
    </>
  );
};

export default Home;
