import React from "react";
import "./App.css";
import Router from "./Router";
import Sidebar from "./components/sidebar/Sidebar";
function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Router />
    </div>
  );
}

export default App;
