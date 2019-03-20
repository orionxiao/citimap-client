import React from "react";
import { FooterWrapper } from "./StyledComponents";
import githubLogo from "../img/github-logo.svg";

const Footer = () => (
    <FooterWrapper>
        <a
            href="https://github.com/orionxiao/"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img height="14" width="14" src={githubLogo} alt="githubLogo" />
        </a>
    </FooterWrapper>
);

export default Footer;
