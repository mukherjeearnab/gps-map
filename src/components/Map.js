import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import ChangeView from "./ChangeView";
import HistoryIcon from "./HistoryIcon";

const Map = (props) => {
    return (
        <div>
            <MapContainer className="MAP" center={props.position[0]} zoom={16} scrollWheelZoom={true}>
                <ChangeView center={props.position[0]} zoom={16} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={props.position[0]}>
                    <Popup>
                        Time: {props.time}
                        <br />
                        Battery: {props.battery}%
                        <br />
                        Speed: {props.speed} m/s
                    </Popup>
                </Marker>
                {props.position.slice(1).map((item) => {
                    return <Marker position={item} icon={HistoryIcon} />;
                })}
            </MapContainer>
        </div>
    );
};

export default Map;
