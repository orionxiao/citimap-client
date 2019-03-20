import styled from "styled-components";

export const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 15% 67% 15% 3%;
    height: 100vh;
    width: 100vw;
`;

export const MapWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    -webkit-box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.3);
    -moz-box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.3);
    box-shadow: 0px 0px 3em 7px rgba(70, 95, 135, 0.3);
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border: 0.2px groove #546c8f;
`;

export const HeaderWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: center;
`;

export const HeaderContent = styled.h1`
    font-size: 2.6em;
    color: rgb(41, 51, 66);
    text-shadow: 1px 1px 4px #425e89;
    margin-bottom: 0.1em;
    margin-left: 0.2em;
    letter-spacing: 0.3em;
    text-align: center;
    font-weight: bold;
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

export const OptionsWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    justify-self: center;
    text-align: center;
    margin-top: 1.5em;
    font-size: 1.1em;
    overflow: auto;
    color: rgb(73, 73, 73);
`;

export const DropdownWapper = styled.div`
    margin-bottom: 1em;
`;

export const ToggleLabel = styled.div`
    display: inline-block;
    ${props => props.active && "color: #2274aa; font-weight: bold;"}
`;

export const ToggleSwitch = styled.div`
    -webkit-box-shadow: 0px 0px 0.5em 2px rgba(70, 95, 135, 0.3);
    -moz-box-shadow: 0px 0px 0.5em 2px rgba(70, 95, 135, 0.3);
    box-shadow: 0px 0px 0.5em 2px rgba(70, 95, 135, 0.3);
    background: rgba(41, 64, 79, 0.3);
    width: 80px;
    height: 30px;
    overflow: hidden;
    border-radius: 2px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 1em;
    cursor: pointer;

    &:after {
        content: " ";
        display: block;
        width: 40px;
        height: 30px;
        background-color: #2274aa;
        border: 2px solid #fff;
        border-top: 0;
        border-bottom: 0;
        margin-left: ${props => (props.active ? "40px" : "-3px")};
        transition: all 0.1s ease-in;
    }
`;

export const FooterWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 4 / end;
    justify-self: center;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
`;

export const LoadingWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    margin: 0 0;
    padding: 0 0;
    display: flex;
`;
