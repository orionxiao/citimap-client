import React, { Component } from "react";
import L from "leaflet";
import { greenIcon, yellowIcon, redIcon, userIcon } from "./Markers";
// stylesheet from leaflet package doesn't work, use cdn in index.html instead
// import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const AppWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2em;
`;

const MapWrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

const Container = styled.div``;

class App extends Component {
    state = {
        lat: 0,
        long: 0
    };

    getIcon = available => {
        if (available === 0) {
            return redIcon;
        } else if (available <= 5) {
            return yellowIcon;
        } else {
            return greenIcon;
        }
    };

    createBikeLayer = stations => {
        let markers = [];
        stations.map(s =>
            markers.push(
                L.marker([s.coords.lat, s.coords.long], {
                    icon: this.getIcon(s.bikes)
                }).bindPopup(`${s.name} Bikes: ${s.bikes}`)
            )
        );

        return L.layerGroup(markers);
    };

    createMap = stations => {
        const { lat, long } = this.state;
        const CartoDB_Positron = L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: "abcd",
                maxZoom: 19
            }
        );

        let userMarker = L.marker([lat, long], {
            icon: userIcon
        }).bindPopup("You are here");
        let userLayer = L.layerGroup([userMarker]);

        let stationsLayer = this.createBikeLayer(stations);

        this.map = L.map("map", {
            center: [lat, long],
            zoom: 14,
            zoomControl: false,
            layers: [CartoDB_Positron, userLayer, stationsLayer]
        });
    };

    getData = async () => {
        const { lat, long } = this.state;
        console.log(lat, long);
        const resp = await fetch(
            `http://localhost:3001/api/test/${lat}/${long}`
        );
        const reader = resp.body.getReader();
        let buf = "";
        let self = this;

        reader.read().then(function processChunk({ done, value }) {
            if (done) {
                console.log("Stream complete");
                const stations = JSON.parse(buf);
                console.log(stations);
                console.log(stations.length);
                self.createMap(stations);
                return;
            } else {
                console.log("chunk");
                let str = new TextDecoder("utf-8").decode(value);
                buf = buf.concat(str);
                return reader.read().then(processChunk);
            }
        });
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position =>
                this.setState(
                    {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    },
                    () => this.getData()
                ),
            error => console.error(error.message),
            { enableHighAccuracy: true }
        );
    }
    render() {
        return (
            <AppWrapper>
                <Container>
                    <MapWrapper width="600px" height="600px" id="map" />
                </Container>
            </AppWrapper>
        );
    }
}

export default App;
