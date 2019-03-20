import styled from "styled-components";

export const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 15% 62% 20% 3%;
    height: 100vh;
    width: 100vw;
`;

export const MapWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    -webkit-box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.87);
    -moz-box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.87);
    box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.87);
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    border: 0.5px groove #546c8f;
`;

export const HeaderWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: center;
`;

export const HeaderContent = styled.h1`
    font-size: 2.6em;
    color: rgb(41, 51, 66);
    text-shadow: 1.5px 1.5px 4px #425e89;
    margin-bottom: 0.1em;
    margin-left: 0.2em;
    letter-spacing: 0.3em;
    text-align: center;
`;

export const SubHeaderContent = styled.h4`
    color: rgb(61, 61, 61);
    text-shadow: 0.5px 0.5px 1px #425e89;
    margin-top: 0;
    letter-spacing: 0.12em;
    text-align: center;
`;

export const InfoPanelWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    justify-self: center;
    text-align: center;
    margin-top: 1.5em;
    font-size: 1.1em;
    overflow: auto;
    color: rgb(73, 73, 73);
`;

export const FooterWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 4 / end;
    justify-self: center;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
`

export const LoadingWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    margin: 0 0;
    padding: 0 0;
    display: flex;
`;

