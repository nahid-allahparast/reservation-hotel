import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotel } from "../../context/HotelsProvider";
import { useParams, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import { MdLocationOn } from "react-icons/md";

const Map = () => {
  const { isLoading, hotels } = useHotel();
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {
    isLoading: isLoadingPositon,
    position: geoPosition,
    getGeoPosition,
  } = useGeoLocation();
  const { id } = useParams();
  useEffect(() => {
    if (lat && lng) {
      setMapCenter([lat, lng]);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapCenter([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button onClick={getGeoPosition} className="getLocation">
          {isLoadingPositon ? "loading ..." : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => {
          return (
            <Marker
              key={item.id}
              className="marker"
              position={[item.latitude, item.longitude]}
            >
              {item.id === id && <MdLocationOn />}
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
};
