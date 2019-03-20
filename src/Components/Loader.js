import React from "react";
import { LoadingWrapper } from "./StyledComponents";
import loadingIcon from "../img/loading-icon.svg";

const Loader = () => (
    <LoadingWrapper>
        <img
            src={loadingIcon}
            alt="loading..."
            style={{ margin: "auto"}}
        />
    </LoadingWrapper>
);

export default Loader;
