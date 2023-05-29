import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./Map.css";

class MapComponent extends React.Component {
  state = {
    lat: 39,
    lng: 35,
    zoom: 6,
    items: [],
  };

  render() {
    const { lat, lng, zoom } = this.state;
    const { items } = this.props;

    const center = [lat, lng];

    // Özel ikon oluşturma
    const customIcon = L.icon({
      iconUrl: '/assets/logos/location.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    return (
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {items &&
          items.map((item, index) => {
            if (item.latitude && item.longitude) {
              return (
                <Marker key={index} position={[item.latitude, item.longitude]} icon={customIcon}>
                  <Popup>
                    <div>
                      <h3>{item.name}</h3>
                      <p>Category: {item.category}</p>
                      <p>Latitude: {item.latitude}</p>
                      <p>Longitude: {item.longitude}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            } else {
              return null;
            }
          })}
      </MapContainer>
    );
  }
}

export default MapComponent;