import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    font-family: "Inter", sans-serif;
  }
  
  @supports (font-variation-settings: normal) {
    :root {
      font-family: "Inter var", sans-serif;
    }
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
    background: black;
  }
  .container {
    background-color: rgb(0, 0, 0);
  }
  .container--animeRow {
    margin: 20px;
  }
  .container--animeRow h1 {
    color: #fff;
  }
  .container--animeRow--anime {
    max-width: 2200px;
    background: rgb(0, 0, 0);
    width: 100%;
    position: relative;
  }
  
  footer {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    color: #f7a6b9;
    text-align: center;
    background-color: rgb(0, 0, 0);
    transition: all ease 0.5s;

  footer p {
    padding: 20px;
    background: black;
  }
`;

export default GlobalStyle;
