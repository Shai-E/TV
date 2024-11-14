import React from "react";
import "./App.css";
import {HashRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import GridTV from "./components/GridTV";
import {allChannels} from "./lib/data/channels";

function App() {
    return (
        <div className="App" style={{height: "100%", flex: 1}}>
            <Router>
                <Routes>
                    <Route
                        path="/:style"
                        element={
                            <GridTV channelsArray={allChannels} />
                        }
                    />
                        <Route
                            path="*"
                            element={<Navigate to="/grid" replace />}
                        />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
