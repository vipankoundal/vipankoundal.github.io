import React from "react";
import { useSelector } from "react-redux";
import avatarImg from "../../../assets/Avatar.png";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import Avatar from "../../../components/skeleton/avatar";
import "./style.scss";
const Cast = ({ data, isLoading }) => {
  const { url } = useSelector((state) => state.home);
  return (
    <>
      <Avatar />
      <div className="castSection">
        <ContentWrapper>
          <div className="sectionHeading">Top Cast</div>(
          {!isLoading ? (
            <div className="listItems">
              {data?.map((castItem) => {
                let imgUrl = castItem.profile_path
                  ? url.profile + castItem.profile_path
                  : avatarImg;
                return (
                  <div key={castItem.id} className="listItem">
                    <div className="profileImg">
                      <Img src={imgUrl} />
                    </div>
                    <div className="name">{castItem.name}</div>
                    <div className="character">{castItem.character}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="castSkeleton">
              {<Avatar />}
              {<Avatar />}
              {<Avatar />}
              {<Avatar />}
              {<Avatar />}
              {<Avatar />}
            </div>
          )}
          )
        </ContentWrapper>
      </div>
      ;
    </>
  );
};

export default Cast;
