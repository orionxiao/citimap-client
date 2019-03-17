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

    /**
     * Return different pin colors based on available bikes in station
     */
    getIcon = available => {
        if (available === 0) {
            return redIcon;
        } else if (available <= 5) {
            return yellowIcon;
        } else {
            return greenIcon;
        }
    };

    /**
     * Create map layer containing all station markers
     */
    createStationLayer = stations => {
        let markers = [];
        /**
         * TODO: Add onclick method to markers to display station info under/to side of map
         */
        stations.map(s =>
            markers.push(
                L.marker([s.coords.lat, s.coords.long], {
                    icon: this.getIcon(s.bikes),
                    title: s.name
                }).bindPopup(`Bikes: ${s.bikes}`)
            )
        );

        return L.layerGroup(markers);
    };

    /**
     * Creates map centered on user location and renders pins for all stations within 1.5 miles
     */
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
        ); //Map styling

        let userMarker = L.marker([lat, long], {
            icon: userIcon
        }).bindPopup("You are here");
        let userLayer = L.layerGroup([userMarker]); //TODO: Merge user icon into station layer? What are pros/cons

        let stationsLayer = this.createStationLayer(stations);

        this.map = L.map("map", {
            center: [lat, long],
            zoom: 14,
            zoomControl: false,
            layers: [CartoDB_Positron, userLayer, stationsLayer]
        }); //Map configuration
    };

    /**
     * Make GET request to server and process data, then pass to createMap function
     * TODO: Refactor if adding other API calls and put them in an API folder
     */
    getData = async () => {
        const { lat, long } = this.state;
        console.log(lat, long);
        const resp = await fetch(
            `http://localhost:3001/api/test/${lat}/${long}`
        ); //API call
        const reader = resp.body.getReader();
        let buf = ""; //Store string data from unsigned int conversion
        let self = this; //TODO: make this part look less hacky by binding the createMap function or something
        /**
         * Recursively process chunks of unsigned int arrays from ReadableStream and convert
         * back into stations object
         */
        reader.read().then(function processChunk({ done, value }) {
            if (done) {
                console.log("Stream complete");
                const stations = JSON.parse(buf); //Parse result
                console.log(stations);
                console.log(stations.length);
                self.createMap(stations);
                return;
            } else {
                console.log("chunk");
                let str = new TextDecoder("utf-8").decode(value); //Convert from uint8array into string
                buf = buf.concat(str); //Add to prior chunks
                return reader.read().then(processChunk); //Recurse until done
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
