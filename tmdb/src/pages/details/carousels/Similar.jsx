import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Similar = ({ mediaType, id }) => {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "similar TV Shows" : "Similar movies";
  return (
    <Carousel
      title={title}
      data={data?.results}
      isLoading={isLoading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
