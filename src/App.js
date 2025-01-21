import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import NewBoardForm from "./components/modal/NewBoard/NewBoardForm";
import EditBoard from "./components/modal/EditBoard/EditBoard";
import NeedHelp from "./components/modal/Needhelp/NeedHelp";

import "./styles/variables.css";

function App() {
  const [isNewBoardModalOpen, setIsNewBoardModalOpen] = useState(false);
  const [isEditBoardModalOpen, setIsEditBoardModalOpen] = useState(false);
  const [isNeedHelpModalOpen, setIsNeedHelpModalOpen] = useState(false);

  const openNewBoardModal = () => setIsNewBoardModalOpen(true);
  const openEditBoardModal = () => setIsEditBoardModalOpen(true);
  const openNeedHelpModal = () => setIsNeedHelpModalOpen(true);

  const closeNewBoardModal = () => setIsNewBoardModalOpen(false);
  const closeEditBoardModal = () => setIsEditBoardModalOpen(false);
  const closeNeedHelpModal = () => setIsNeedHelpModalOpen(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeNewBoardModal();
        closeEditBoardModal();
        closeNeedHelpModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Butoane pentru a deschide modalele */}
        <button onClick={openNewBoardModal}>Create Modal</button>
        <button onClick={openEditBoardModal}>Edit Modal</button>
        <button onClick={openNeedHelpModal}>Need Help</button>

        {/* Modalul NewBoardForm */}
        {isNewBoardModalOpen && <NewBoardForm onClose={closeNewBoardModal} />}

        {/* Modalul EditBoard */}
        {isEditBoardModalOpen && <EditBoard onClose={closeEditBoardModal} />}

        {/* Modalul NeedHelp */}
        {isNeedHelpModalOpen && <NeedHelp onClose={closeNeedHelpModal} />}

        <Routes>
          <Route path="/TaskPro" element={<Welcome />} />
          <Route path="/TaskPro/new-board" element={<NewBoardForm onClose={closeNewBoardModal} />} />
          <Route path="/TaskPro/edit-board" element={<EditBoard onClose={closeEditBoardModal} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
