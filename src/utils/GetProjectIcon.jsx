import React from "react";
import PropTypes from "prop-types";
import iconsSvg from "../images/projectIconsSprite.svg";

function GetProjectIcon({ iconNumber, className }) {
  // Ensure the iconNumber is within the valid range (0-7)
  if (iconNumber < 0 || iconNumber > 7 || isNaN(iconNumber)) {
    console.error("Invalid icon number:", iconNumber);
    return null; // Return null or a default icon if the number is invalid
  }

  const iconId = `#${iconNumber}`; // Construct the SVG ID
  return (
    <svg className={className}>
      <use href={`${iconsSvg}${iconId}`} />
    </svg>
  );
}

GetProjectIcon.propTypes = {
  iconNumber: PropTypes.number.isRequired, // `iconNumber` is required and must be a number
  className: PropTypes.string, // Optional: `className` must be a string
};

export default GetProjectIcon;
