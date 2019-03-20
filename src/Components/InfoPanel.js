import React from "react";
import { InfoPanelWrapper } from "./StyledComponents";
import bikeIcon from "../img/bike-icon.png";
import rackIcon from "../img/bike-rack-icon.png";
import serviceIcon from "../img/service-icon.png";

const createDropdown = (searchRange, dropdownOnChange) => (
    <label>
        {" "}
        Search Range:{" "}
        <select defaultValue={searchRange} onChange={dropdownOnChange}>
            <option value="1">1 mile</option>
            <option value="2">2 miles</option>
            <option value="3">3 miles</option>
            <option value="4">4 miles</option>
            <option value="5">5 miles</option>
        </select>
    </label>
);

/**
 * Stateless functional component that returns the InfoPanel containing
 * information about the currently selected station as well as the dropdown
 * menu for search range, using props passed down from the App component
 */
const InfoPanel = ({ station, searchRange, dropdownOnChange }) =>
    station ? (
        <InfoPanelWrapper>
            {createDropdown(searchRange, dropdownOnChange)}
            <h4 style={{ marginBottom: "0.1em", marginTop: "0.5em" }}>
                {station.name}
            </h4>
            <div>
                <img height="18" width="18" src={bikeIcon} alt="bikeIcon" />{" "}
                Bikes Available: <strong>{station.bikes}</strong>
            </div>
            <div>
                <img height="15" width="15" src={rackIcon} alt="rackIcon" />
                {"  "}
                Total Capacity: <strong>{station.totalDocks}</strong>
            </div>
            <div>
                <img
                    height="12"
                    width="12"
                    src={serviceIcon}
                    alt="serviceIcon"
                />
                {"  "}
                Status: <strong>{station.status}</strong>
            </div>
        </InfoPanelWrapper>
    ) : (
        <InfoPanelWrapper>
            {createDropdown(searchRange, dropdownOnChange)}
            <h4 style={{ marginBottom: "0.1em", marginTop: "2em" }}>
                Click a station pin to view details
            </h4>
        </InfoPanelWrapper>
    );

export default InfoPanel;
