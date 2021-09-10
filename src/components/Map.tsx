import React, { FC, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { Map as mp } from "leaflet";
import { LatLngExpression } from "leaflet";
import "../css/map.css";
interface Props {
  center: LatLngExpression | number[];
  zoom: number;
}

const Map: FC<Props> = ({ center, zoom }) => {
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
