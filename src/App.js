// import "./App.css";

// function App() {
//   return <div className="App"></div>;
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/TaskPro" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
