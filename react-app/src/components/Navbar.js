import Category from "./Category";
import { useGlobalContext } from "../context/global";
import { Link } from "react-router-dom";
import TestSearch from "./TestSearch";
import styled from "styled-components";
import PropTypes from "prop-types";

function Navbar({className}) {
  const { handleChange, handleSubmit, search} =
    useGlobalContext();

  return (
    <div className={className}>
    <header>
      <div className="header--logo">
        <Link to="/">
          <img src="/round-logo.png" alt="img" />
        </Link>
      </div>
      <Category />

      <form action="" className="header--searchbar" onSubmit={handleSubmit}>
        <Link to="/search" element={<TestSearch />}>
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={handleChange}
          />
        </Link>
        <button type="submit">
          <img src="/search.png" alt="img" />
        </button>
      </form>
    </header></div>
  );
}

Navbar.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Navbar)`
header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  background: black;
  transition: all ease 0.5s;
}
.header--logo {
  display: flex;
  align-items: center;
}

.header--logo a {
  text-decoration: none;
}

.header--logo img {
  width: 200px;
  height: auto;
  cursor: pointer;
}

.header--category {
  color: #f7a6b9;
  text-decoration: none;
  font-size: 20px;
  margin: 20px;
}

.header--category--genres {
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  padding-top: 5px;
}

.header--searchbar {
  width: 100%;
  max-width: 20%;
  height: 50%;
  background: #f7a6b9;
  display: flex;
  align-items: center;
  border-radius: 60px;
  padding-right: 1%;
  padding-left: 10px;
  margin-left: auto;
  justify-content: space-between;
}

.header--searchbar input {
  background: transparent;
  flex: 1;
  border: 0;
  outline: none;
  font-size: 15px;
  color: #fff;
}

.header--searchbar ::placeholder {
  color: #fff;
}

.header--searchbar button img {
  width: 25px;
  transition: filter 0.3s;
}

.header--searchbar button {
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
}

.header--searchbar button:hover img {
  filter: invert(100%) sepia(50%) saturate(50%);
}

`;