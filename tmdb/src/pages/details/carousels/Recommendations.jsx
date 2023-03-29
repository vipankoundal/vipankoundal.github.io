import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendations = ({ mediaType, id }) => {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/recommendations`);
  const title =
    mediaType === "tv" ? "Recommendations TV Shows" : "Recommendations movies";
  return (
    <Carousel
      title={title}
      data={data?.results}
      isLoading={isLoading}
      endpoint={mediaType}
    />
  );
};

export default Recommendations;
