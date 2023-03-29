import React from "react";
import "./style.scss";
import HomeBanner from "./HomeBanner/HomeBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import Rated from "./rated/Rated";
const Home = () => {
  return (
    <div className="homepage">
      <HomeBanner />
      <Trending />
      <Popular />
      <Rated />
    </div>
  );
};

export default Home;
