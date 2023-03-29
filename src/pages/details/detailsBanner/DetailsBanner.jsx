import dayjs from "dayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircleRating from "../../../components/circleRating/CircleRating";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoadImage/Img";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import useFetch from "../../../hooks/useFetch";
import PlayBtn from "../PlayBtn";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";
const DetailsBanner = ({ video, crew }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { medaiType, id } = useParams();
  const { data, isLoading } = useFetch(`/${medaiType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const genres = data?.genres?.map((g) => g.id);
  const director = crew?.filter((c) => c.job === "Director");
  const writer = crew?.filter(
    (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  return (
    <div className="detailsBanner">
      {!isLoading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-payer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.backdrop_path ? (
                      <Img
                        src={url.backdrop + data.backdrop_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.title || data.name} (${dayjs(
                        data.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(2)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShowVideo(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">status: {""}</span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                    </div>
                    <div className="info">
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release date: {""}</span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="info">
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Run time: {""}</span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: {""}</span>
                        <span className="text">
                          {director?.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name} {director.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">writer: {""}</span>
                        <span className="text">
                          {writer?.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name} {writer.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: {""}</span>
                        <span className="text">
                          {data.created_by?.map((d, i) => {
                            return (
                              <span key={i}>
                                {d.name}{" "}
                                {data.created_by.length - 1 !== i && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  showVideo={showVideo}
                  setShowVideo={setShowVideo}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
