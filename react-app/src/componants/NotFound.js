import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <ErrorPage>
      <Content>
        <Header data-text="404">404</Header>
        <H4 data-text="Opps! Page not found">Opps! Page not found</H4>
        <Paragraph>
          Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
        </Paragraph>
        <Link to='/'>
        <Buttons>
          <Button>Return Home</Button>
        </Buttons>
        </Link>
      </Content>
    </ErrorPage>
  );
}

const ErrorPage = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
`;

const Content = styled.div`
  max-width: 600px;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 18vw;
  color: #ff0582;
  line-height: 1em;
  position: relative;
  margin: 0 0 0 0 ;
`;

const H4 = styled.h4`
  font-size: 1.5em;
  text-transform: uppercase;
  color: #f7a6b9;
  font-size: 2em;
  max-width: 600px;
  position: relative;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  color: #f7a6b9;
`;

const Buttons = styled.div`
  margin: 25px 0;
  display: inline-flex;
`;

const Button = styled.a`
  display: inline-block;
  margin: 0 10px;
  text-decoration: none;
  border: 2px solid #f7a6b9;
  color: #f7a6b9;
  font-weight: 500;
  padding: 10px 25px;
  border-radius: 25px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: #ff0582;
    color: #fff;
  }
`;

export default NotFound;