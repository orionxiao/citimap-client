import styled from "styled-components";

export const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 7.5% 85% 7.5%;
    grid-template-rows: 12% 65% 18% 5%;
    height: 100vh;
    width: 100vw;
`;

export const MapWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    -webkit-box-shadow: 0px 0px 4em 7px rgba(55, 67, 79, 0.87);
    -moz-box-shadow: 0px 0px 4em 7px rgba(55, 67, 79, 0.87);
    box-shadow: 0px 0px 4em 7px rgba(55, 67, 79, 0.87);
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    border: 0.5px groove #546c8f;
`;

export const Header = styled.h1`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: center;
`;

export const HeaderContent = styled.div`
    font-size: 1.5em;
    font-variant: small-caps;
    color: rgb(41, 51, 66);
    text-shadow: 1.5px 1.5px 4px #425e89;
`;

export const InfoPanel = styled.div`
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    justify-self: center;
    text-align: center;
    margin-top: 0.5em;
`;