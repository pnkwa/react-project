import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { genreNames, getGenreFromId } from "../context/genresCase";
import styled from "styled-components";
import PropTypes from "prop-types";

function Category({ className }) {
  const dropdownRef = useRef(null);
  const [genre, setGenre] = useState("Genres");
  const location = useLocation();

  useEffect(() => {
    const genreId = location.pathname.split("/")[2]; // Extract genreId from URL
    setGenre(getGenreFromId(genreId));
  }, [location.pathname]);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelectorAll(".menu li");
    const selected = dropdown.querySelector(".selected");

    const handleSelectClick = () => {
      select.classList.toggle("select-clicked");
      caret.classList.toggle("caret-rotate");
      menu.classList.toggle("menu-open");
    };

    const handleOptionClick = (option) => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");

      options.forEach((opt) => {
        opt.classList.remove("active");
      });
      option.classList.add("active");
    };

    select.addEventListener("click", handleSelectClick);
    options.forEach((option) => {
      option.addEventListener("click", () => {
        handleOptionClick(option);
      });
    });
    return () => {
      select.removeEventListener("click", handleSelectClick);
      options.forEach((option) => {
        option.removeEventListener("click", () => {
          handleOptionClick(option);
        });
      });
    };
  }, []);

  return (
    <div className={className}>
      <div className="dropdown" ref={dropdownRef}>
        <div className="select">
          <span className="selected">{genre}</span>
          <div className="caret"></div>
        </div>
        <ul className="menu">
          {genreNames.map((genreName, index) => (
            <Link to={`/genres/${index + 1}`} key={index}>
              <li>{genreName}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

Category.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Category)`
  .dropdown {
    min-width: 15em;
    position: relative;
    margin: 2em;
  }
  .dropdown * {
    box-sizing: border-box;
  }
  .select {
    color: #f7a6b9;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
  }
  .select-clicked {
    border: 2px black solid;
    box-shadow: 0 0 0.8em black;
  }
  .select:hover {
    background: rgb(49, 49, 49);
  }
  .caret {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #fff;
    transition: 0.3s;
  }
  .caret-rotate {
    transform: rotate(180deg);
  }
  .menu {
    list-style: none;
    padding: 0.2em 0.5em;
    background: rgb(49, 49, 49);
    border: 1px rgb(49, 49, 49) solid;
    box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.2);
    border-radius: 0.5em;
    color: #f7a6b9;
    position: absolute;
    top: 4.5em;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);
    opacity: 0;
    display: none;
    transition: 0.2s;
    z-index: 1;
  }
  .menu li {
    padding: 0.7em 0.5em;
    margin: 0.3em 0;
    border-radius: 0.5em;
    cursor: pointer;
  }
  .menu li:hover {
    background: black;
  }
  .menu a {
    text-decoration: none;
    color: #f7a6b9;
  }
  .active {
    background: black;
  }
  .menu-open {
    display: block;
    opacity: 1;
  }
`;