import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function Footer({ className }) {
  return (
    <div className={className}>
      <footer>
        <p>Create By Lugie, KwanJai, TinTin, KwaKwa for React project ©2023</p>
      </footer>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Footer)`
footer {
  left: 0;
  bottom: 0;
  width: 100%;
  color: #f7a6b9;
  text-align: center;
  background-color: black;
  transition: all ease 0.5s;
  padding: 20px;
`;