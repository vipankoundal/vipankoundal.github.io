import React from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import { useParams } from "react-router-dom";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendations from "./carousels/Recommendations";
const Details = () => {
  const { medaiType, id } = useParams();
  const { data, isLoading } = useFetch(`/${medaiType}/${id}/videos`);
  const { data: credits, isLoading: creditsIsLoading } = useFetch(
    `/${medaiType}/${id}/credits`
  );
  return (
    <>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} isLoading={creditsIsLoading} />
      <VideosSection data={data} isLoading={isLoading} />
      <Similar mediaType={medaiType} id={id} />
      <Recommendations mediaType={medaiType} id={id} />
    </>
  );
};

export default Details;
