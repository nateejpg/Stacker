import React from "react";
import linkedin from "../images/linkedin.png";
import github from "../images/giticon.png";
import paper from "../images/paper.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerWrapper">
        <a href="https://snapshot-1gk.pages.dev/">
          <img src={paper} />
        </a>
        <a href="https://github.com/nateejpg">
          <img src={github} />
        </a>
        <a href="https://www.linkedin.com/in/nathan-abreu-0b3320219/">
          <img src={linkedin} />
        </a>
      </div>
      <h1>Designed and developed by Natejpg</h1>
    </div>
  );
};

export default Footer;
