import React, { useEffect, useState } from "react";
import ContentWrappers from "../contentWrapper/ContentWrapper";
import "./style.scss";
import { BsFilePlayFill, BsList, BsSearch, BsXLg } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [show, setShow] = useState("topMenu");
  const [lastScrollY, setLastScrollY] = useState();
  const [query, setQuery] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const controlNav = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hideMenu");
      } else {
        setShow("showMenu");
      }
    } else {
      setShow("topMenu");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, [lastScrollY]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };
  const navHandler = (type) => {
    type === "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
    setMobileMenu(false);
  };
  return (
    <header className={`${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrappers>
        <div className="nav__logo" onClick={() => navigate("/")}>
          <BsFilePlayFill /> Player
        </div>

        <ul className="nav__menuList">
          <li className="menuList" onClick={() => navHandler("movie")}>
            Movies
          </li>
          <li className="menuList" onClick={() => navHandler("tv")}>
            TV Shows
          </li>
          <li className="menuList">
            <BsSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileItems">
          <BsSearch onClick={openSearch} />
          {mobileMenu ? (
            <BsXLg onClick={() => setMobileMenu(false)} />
          ) : (
            <BsList onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrappers>

      {showSearch && (
        <ContentWrappers>
          <div className="searchInput">
            <input
              name="query"
              type="text"
              placeholder="Search for a movie, tv show, person......"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <BsXLg onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrappers>
      )}
    </header>
  );
};

export default Header;
