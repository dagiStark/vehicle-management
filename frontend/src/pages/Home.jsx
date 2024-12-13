import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Overview from "../sections/Overview";
import Vehicles from "../sections/Vehicles";

function Home() {
  return (
    <div className="m-3">
      <div className="flex ">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="overview" element={<Overview />} />
            <Route path="vehicles" element={<Vehicles />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default Home;
