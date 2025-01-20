import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import NewBoardForm from "./components/modal/NewBoard/NewBoardForm"; 
import "./styles/variables.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funcția pentru a deschide modalul
  const openModal = () => setIsModalOpen(true);

  // Funcția pentru a închide modalul
  const closeModal = () => setIsModalOpen(false);

  // Ascultător pentru Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();  // Închide modalul când apăsăm Escape
      }
    };

    window.addEventListener("keydown", handleEscape);

    // Curățarea evenimentului la demontarea componentei
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Butonul care deschide modalul */}
        <button onClick={openModal}>Create Modal</button>

        {/* Modalul */}
        {isModalOpen && (
          <NewBoardForm onClose={closeModal} />
        )}

        <Routes>
          <Route path="/TaskPro" element={<Welcome />} />
          <Route path="/TaskPro/new-board" element={<NewBoardForm onClose={closeModal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
