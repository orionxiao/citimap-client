import React, { Component } from "react";
import L from "leaflet";
import { greenIcon, yellowIcon, redIcon, userIcon } from "./Markers";
import { AppWrapper, MapWrapper } from "./StyledComponents";
import Header from "./Header";
import Footer from "./Footer";
import OptionsPanel from "./OptionsPanel";
import Loader from "./Loader";
import bikeIcon from "../img/bike-icon.png";
import rackIcon from "../img/bike-rack-icon.png";
import serviceIcon from "../img/service-icon.png";

class App extends Component {
    state = {
        lat: 0,
        long: 0,
        searchRange: 2,
        lookingForBike: true,
        pageLoading: true,
        mapLoading: true
    };

    onToggle = () => {
        const { lookingForBike } = this.state;
        this.setState(
            { lookingForBike: !lookingForBike, mapLoading: true },
            this.updateStations
        );
    };

    getRangeInMeters = () => {
        const { searchRange } = this.state;
        return searchRange * 1609.344;
    };

    dropdownOnChange = e => {
        this.setState(
            { searchRange: e.target.value, mapLoading: true },
            this.updateStations
        );
    };

    /**
     * Return different pin colors based on available bikes in station
     */
    getIcon = (bikes, totalDocks, status) => {
        const { lookingForBike } = this.state;
        let available = lookingForBike ? bikes : totalDocks - bikes;
        if (available === 0 || status !== "In Service") {
            return redIcon;
        } else if (available <= 5) {
            return yellowIcon;
        } else {
            return greenIcon;
        }
    };

    /**
     * TODO: Create marker containing data and onclicks
     */
    createStationMarker = station => {
        let marker = L.marker([station.coords.lat, station.coords.long], {
            icon: this.getIcon(
                station.bikes,
                station.totalDocks,
                station.status
            ),
            title: station.name
        });
        marker.station = station;
        marker.stationName = station.name;
        let popupText = `
        <h4 style="margin-bottom: 0.1em">
            ${station.name}
        </h4>
        <div>
            <img height="18" width="18" src=${bikeIcon} alt="bikeIcon" />${" "}
            Bikes Available: <strong>${station.bikes}</strong>
        </div>
        <div>
            <img height="15" width="15" src=${rackIcon} alt="rackIcon" />
            ${"  "}
            Docks Available: <strong>${station.totalDocks -
                station.bikes}</strong>
        </div>
        <div>
            <img
                height="15"
                width="15"
                src=${serviceIcon}
                alt="serviceIcon"
            />
            ${"  "}
            Status: <strong>${station.status}</strong>
        </div>`;
        marker.bindPopup(popupText);

        return marker;
    };

    /**
     * Create map layer containing all station markers
     */
    createStationLayer = stations => {
        let markers = [];
        stations.map(s => markers.push(this.createStationMarker(s)));

        return L.layerGroup(markers);
    };

    /**
     * Creates map centered on user location and renders pins for all stations within 1.5 miles
     */
    createMap = stations => {
        const { lat, long } = this.state;
        let Wikimedia = L.tileLayer(
            "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
            {
                attribution:
                    '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
                minZoom: 1,
                maxZoom: 19
            }
        ); //Map styling

        let userMarker = L.marker([lat, long], {
            icon: userIcon
        }).bindPopup("You are here");

        let userLayer = L.layerGroup([userMarker]);

        let stationsLayer = this.createStationLayer(stations);

        this.setState({ pageLoading: false, mapLoading: false }, () => {
            this.map = L.map("map", {
                center: [lat, long],
                zoom: 14,
                zoomControl: true,
                layers: [Wikimedia, userLayer, stationsLayer]
            }); //Map configuration

            L.circle([lat, long], this.getRangeInMeters(), {
                weight: 2,
                opacity: 0.5,
                color: "#59ade5"
            }).addTo(this.map);
        });
    };

    updateStations = () => {
        this.map.remove();
        this.getData();
    };

    /**
     * Make GET request to server and process data, then pass to createMap function
     * TODO: Refactor if adding other API calls and put them in an API folder
     */
    getData = async () => {
        const { lat, long, searchRange } = this.state;
        // console.log(lat, long);
        const resp = await fetch(
            `https://citimap-server.herokuapp.com/api/stations/${lat}/${long}/${searchRange}`
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
                // console.log("Stream complete");
                const stations = JSON.parse(buf); //Parse result
                // console.log(stations);
                // console.log(stations.length);
                self.createMap(stations);
                return;
            } else {
                // console.log("chunk");
                let str = new TextDecoder("utf-8").decode(value); //Convert from uint8array into string
                buf = buf.concat(str); //Add to prior chunks
                return reader.read().then(processChunk); //Recurse until done
            }
        });
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState(
                    {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    },
                    () => this.getData()
                );
            },
            error => console.error(error.message),
            { enableHighAccuracy: true }
        );
    }
    render() {
        const {
            lookingForBike,
            searchRange,
            pageLoading,
            mapLoading
        } = this.state;
        return pageLoading ? (
            <Loader />
        ) : (
            <AppWrapper>
                <Header />
                {mapLoading ? <Loader /> : <MapWrapper id="map" />}
                <OptionsPanel
                    searchRange={searchRange}
                    dropdownOnChange={this.dropdownOnChange}
                    lookingForBike={lookingForBike}
                    onToggle={this.onToggle}
                    mapLoading={mapLoading}
                />
                <Footer />
            </AppWrapper>
        );
    }
}

export default App;
