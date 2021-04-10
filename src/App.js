import { useState } from "react";

import "./App.css";

import Map from "./components/Map";

function App() {
    const [login, setLogin] = useState("");
    const [token, setToken] = useState("");
    const [position, setPosition] = useState([
        [51.505, -0.09],
        [51.505, -0.091],
        [51.505, -0.092],
        [51.505, -0.093],
        [51.505, -0.094],
    ]);
    const [speed, setSpeed] = useState(0);
    const [battery, setBattery] = useState(0);
    const [time, setTime] = useState("10 AM");

    const requestLocation = (jwtoken) => {
        fetch("location/get/10", {
            method: "GET",
            headers: { "Content-Type": "application/json", "x-access-token": jwtoken ? jwtoken : token },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("LOCATION", data);
                const time = new Date(data[0].time * 1000).toTimeString().substr(0, 8);
                // console.log(time);
                const tempPos = [];
                for (let loc of data) {
                    tempPos.push([loc.location.latitude, loc.location.longitude]);
                }
                console.log("POS ARRAY", tempPos);

                setPosition(tempPos);
                setBattery(data[0].battery);
                setSpeed(data[0].speed);
                setTime(time);
            });
    };

    return (
        <div className="App">
            <header className="header">
                <div className="left-pane">
                    <h1>GPS-Tracker</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            requestLocation();
                        }}
                    >
                        Reload Map
                    </button>
                </div>
                <div></div>
                <div className="right-pane">
                    <h1>
                        <input
                            id="password"
                            type="password"
                            class="form-control"
                            name="password"
                            placeholder="Password"
                            value={login}
                            onChange={(event) => {
                                setLogin(event.target.value);
                            }}
                        />
                        <button
                            className="btn btn-success"
                            value="Submit"
                            onClick={() => {
                                // console.log("LOGIN REQUEST", login);
                                fetch("api/auth/login", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ password: login }),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        alert(data.message);
                                        setToken(data.jwtoken);
                                        // console.log("TOKEN", data.jwtoken);
                                        requestLocation(data.jwtoken);
                                    });
                            }}
                        >
                            Login
                        </button>
                    </h1>
                </div>
            </header>
            <Map position={position} speed={speed} battery={battery} time={time}></Map>
        </div>
    );
}

export default App;
