import React, { useState } from "react";
import Input from "./input";
import Button from "./Addbutton";
import "./AddCard.styled.css";
// import { Description, Textarea } from '@headlessui/react';

export default function AddCard({ onClose }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState(""); // Noua stare pentru textarea

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Gestionează schimbarea pentru textarea
  };

  return (
    <div className="modal-overlay-add">
      <div className="modal-container-add">
        {/* Butonul de închidere */}
        <button className="close-btn" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none">
            <path
              d="M13.5 4.5L4.5 13.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 4.5L13.5 13.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="div-container-add">
          <div className="textAdd">Add Card</div>

          {/* Input pentru titlu */}
          <Input
            className="custom-inputAdd"
            value={title}
            handleChange={handleTitleChange}
            placeholder="Title"
          />

          {/* Textarea pentru comentarii */}
          <Input
            className="custom-input-description"
            value={comment}
            handleChange={handleCommentChange}
            placeholder="Description"
          />
          <div className="label-text">Label color</div>
          <div className="svg-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#8FA1D0" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#E09CB5" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="#BEDBB0" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none">
              <circle cx="7" cy="7" r="7" fill="white" fill-opacity="0.3" />
            </svg>
          </div>
          <div className="div-btn">
            <Button className="custom-create-btn">
              <span>Create</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
