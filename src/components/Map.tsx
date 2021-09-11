import React, { FC, useState } from "react";
import numeral from "numeral";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { Map as mp } from "leaflet";
import { LatLngExpression } from "leaflet";
import "../css/map.css";

interface Props {
  center: LatLngExpression | number[];
  zoom: number;
  countries: any[];
}

const casesTypeColors: { [k: string]: any } = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 100,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 300,
  },
};

export const showDataOnMap = (data: any[], casesType = "cases") =>
  data.map((country: { [key: string]: any }) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            // style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          >
            <img src={country.countryInfo.flag} />
          </div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

const Map: FC<Props> = ({ center, zoom, countries }) => {
  const [map, setMap] = useState<mp>();
  map?.setView(center as LatLngExpression, zoom);
  return (
    <div className="map">
      <MapContainer
        center={center as LatLngExpression}
        zoom={zoom}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        {showDataOnMap(countries)}
        {/* <Marker position={center as LatLngExpression}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
};

export default Map;
