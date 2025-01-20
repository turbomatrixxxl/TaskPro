import React, { useState } from 'react';
import Input from '../../commonComponents/Input/Input';
import "./NewBoardForm.styled.css"
import Button from '../../commonComponents/Buttons/addButton/addButton';
// import { FaPlus } from 'react-icons/fa';
import Sprite from '../../../images/sprite.svg';


const backgroundImages = [
  { id: 1, src: '../../../images/bgImage-dark.jpg' },
  { id: 2, src: '../../../images/bgImage-light.jpg' },
  { id: 3, src: '../../../images/bgImage-violet.jpg' },
  { id: 4, src: '../../../images/bgImage-dark.jpg' },
  { id: 5, src: '../../../images/bgImage-light.jpg' },
  { id: 6, src: '../../../images/bgImage-violet.jpg' },
  { id: 7, src: '../../../images/bgImage-light.jpg' },
  { id: 8, src: '../../../images/bgImage-violet.jpg' },
  { id: 9, src: '../../../images/bgImage-dark.jpg' },
  { id: 10, src: '../../../images/bgImage-light.jpg' },
  { id: 11, src: '../../../images/bgImage-violet.jpg' },
  { id: 12, src: '../../../images/bgImage-dark.jpg' },
  { id: 13, src: '../../../images/bgImage-light.jpg' },
  { id: 14, src: '../../../images/bgImage-violet.jpg' },
  { id: 15, src: '../../../images/bgImage-light.jpg' },
  { id: 16, src: '../../../images/bgImage-violet.jpg' },
];

const Card = ({ className, style }) => (
  <div className={`${className}`} style={style}></div>
);


export default function NewBoardForm({ onClose}) {
  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Butonul de închidere */}
        <button
          className="close-btn "
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M13.5 4.5L4.5 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4.5 4.5L13.5 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </button>

      

        <div className="div-container" >
        <div className="text">
            New board
          </div>
          <Input className="custom-input "
            value={title}
            handleChange={handleTitleChange}
            placeholder="Title"
           
          />
            <h3 >
              Icons
            </h3>
            <div className="icon-container">
      <svg className="icon">
        <use href={`${Sprite}#bell-01`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#hexagon-01`} />
      </svg>
      <svg className="icon">
        <use href={`${Sprite}#lightning-02`} />
      </svg>
    </div>

          <div >
            <h3 >
              Background
            </h3>
            <div className="image-container">
      {backgroundImages.map((image) => (
        <div
          key={image.id}
          className="image-item"
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '24px', // Dimensiune lățime
            height: '24px', // Dimensiune înălțime
            borderRadius: '50%', // Colțuri rotunjite pentru imagini
          }}
        ></div>
      ))}
    </div>
          </div>
          <div className='div-btn'>
          <Button className="custom-create-btn">
            <span>
              Create
            </span>
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
