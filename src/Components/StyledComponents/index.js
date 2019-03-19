import styled from "styled-components";

export const AppWrapper = styled.div`
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 15% 70% 12% 3%;
    height: 100vh;
    width: 100vw;
`;

export const MapWrapper = styled.div`
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    -webkit-box-shadow: 0px 0px 47px 7px rgba(55, 67, 79, 0.87);
    -moz-box-shadow: 0px 0px 47px 7px rgba(55, 67, 79, 0.87);
    box-shadow: 0px 0px 47px 7px rgba(55, 67, 79, 0.87);
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border: 2px groove #546c8f;
`;

export const Header = styled.h1`
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: center;
`;
