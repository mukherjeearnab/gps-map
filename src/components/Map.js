import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChangeView from "./ChangeView";

const Map = (props) => {
    return (
        <div>
            <MapContainer className="MAP" center={props.position} zoom={16} scrollWheelZoom={true}>
                <ChangeView center={props.position} zoom={16} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.position}>
                    <Popup>
                        Time: {props.time}
                        <br />
                        Battery: {props.battery}%
                        <br />
                        Speed: {props.speed} m/s
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
