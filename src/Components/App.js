import React, { Component } from "react";
import L from "leaflet";
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

    createBikeLayer = bikes => {
        let markers = [];
        bikes.map(b =>
            markers.push(
                L.marker([b.coords.lat, b.coords.long])
                .bindPopup(`${b.name} Bikes: ${b.bikes}`)
            )
        );

        return L.layerGroup(markers);
    };

    createMap = bikes => {
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

        let userMarker = L.marker([lat, long]).bindPopup("YOU");
        let userLayer = L.layerGroup([userMarker]);

        let bikesLayer = this.createBikeLayer(bikes);

        this.map = L.map("map", {
            center: [lat, long],
            zoom: 14,
            zoomControl: false,
            layers: [CartoDB_Positron, userLayer, bikesLayer]
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
                const bikes = JSON.parse(buf);
                console.log(bikes);
                console.log(bikes.length);
                self.createMap(bikes);
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
