import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <header>
        <h1>Vehicle Management</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Main;
