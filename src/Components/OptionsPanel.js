import React from "react";
import {
    OptionsWrapper,
    DropdownWapper,
    ToggleSwitch,
    ToggleLabel
} from "./StyledComponents";

const OptionsPanel = ({
    searchRange,
    dropdownOnChange,
    lookingForBike,
    onToggle,
    mapLoading
}) => {
    return (
        <OptionsWrapper>
            <DropdownWapper>
                <label>
                    {" "}
                    Search Range:{" "}
                    <select
                        defaultValue={searchRange}
                        onChange={dropdownOnChange}
                    >
                        <option value="1">1 mile</option>
                        <option value="2">2 miles</option>
                        <option value="3">3 miles</option>
                        <option value="4">4 miles</option>
                        <option value="5">5 miles</option>
                    </select>
                </label>
            </DropdownWapper>
            <ToggleLabel active={!lookingForBike}>
                Dropping Off Bike
            </ToggleLabel>
            <ToggleSwitch
                active={lookingForBike}
                onClick={onToggle}
                mapLoading={mapLoading}
            />
            <ToggleLabel active={lookingForBike}>Picking Up Bike</ToggleLabel>
        </OptionsWrapper>
    );
};

export default OptionsPanel;
