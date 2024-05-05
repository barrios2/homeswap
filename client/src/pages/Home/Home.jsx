import React from "react";

import TEST_ID from "./Home.testid";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container} style={{ color: "yellow" }}>
      <h1>This is the homepage</h1>
      <p>Good luck with the project!</p>
    </div>
  );
};

export default Home;
