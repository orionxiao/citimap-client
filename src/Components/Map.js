import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const MapWrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

class Map extends Component {
    state = {
        lat: 0,
        long: 0
    };

    static getDerivedStateFromProps(nextProps) {
        return {
            lat: nextProps.lat,
            long: nextProps.long
        };
    }

    componentDidMount() {}

    render() {
        this.map = L.map("map", {
            center: [this.state.lat, this.state.long],
            zoom: 12,
            zoomControl: false
        });

        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }).addTo(this.map);
        return <MapWrapper width="600px" height="600px" id="map" />;
    }
}

export default Map;
