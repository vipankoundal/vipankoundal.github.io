import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, isLoading } = useFetch(`/trending/all/${endpoint}`);
  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <h2>Trending</h2>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        data={data?.results}
        isLoading={isLoading}
        endpoint={endpoint}
      />
    </div>
  );
};

export default Trending;
