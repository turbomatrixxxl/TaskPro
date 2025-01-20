import React, { useState } from 'react';
import NewBoardForm from './components/modal/NewBoard/NewBoardForm';

const App = () => {
  // Creează un state pentru a controla vizibilitatea modalului
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funcția pentru a deschide modalul
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  // Funcția pentru a închide modalul
  const handleClose = () => {
    setIsModalOpen(false);
    console.log('Form closed');
  };

  return (
    <div>
      {/* Buton pentru a deschide modalul */}
      <button onClick={handleOpen}>Open Modal</button>

      {/* Condiționează renderizarea modalului pe baza stării */}
      {isModalOpen && <NewBoardForm onClose={handleClose} />}
    </div>
  );
};

export default App;
