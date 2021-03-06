import React from "react";
import { FooterWrapper } from "./StyledComponents";
import githubIcon from "../img/github-icon.svg";

/**
 * Stateless functional component for footer with Github logo and link to repo
 */
const Footer = () => (
    <FooterWrapper>
        <a
            href="https://github.com/orionxiao/citimap"
            target="_blank"
            rel="noopener noreferrer"
        >
            <img height="14" width="14" src={githubIcon} alt="githubIcon" />
        </a>
    </FooterWrapper>
);

export default Footer;
