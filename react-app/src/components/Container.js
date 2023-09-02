import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Container({ children, className }) {
  return <main className={className}>{children}</main>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default styled(Container)`
  background-color: rgb(0, 0, 0);
`;
