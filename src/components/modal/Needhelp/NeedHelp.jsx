import React, { useState } from 'react';
import Input from './input';  
import './NeedHelp.styled.css';  
import Button from './Button'; 

export default function NeedHelp({ onClose }) {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState(''); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); 
  };

  return (
    <div className="modal-overlay-need">
      <div className="modal-container-need">
        
        {/* Butonul de închidere */}
        <button
          className="close-btn"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13.5 4.5L4.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="div-container">
        <div className="text">Need help</div>
          {/* Input pentru email */}
          <Input
            value={email}  
            handleChange={handleEmailChange}
            placeholder="Email address "
            name="email"
            type="email"  
          />

          {/* Input pentru descriere */}
          <Input c
            value={description}  
            handleChange={handleDescriptionChange}  
            placeholder="Comment"
            name="Comment"
            type="text"  
            isComment={true}  
          />
        </div>

        <div className="div-btn-need">
          <Button
            // onClick={() => alert('Button clicked!')} 
            isDisabled={false}
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}
