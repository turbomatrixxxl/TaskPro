function getProjectIcon(iconNumber) {
  // Ensure the iconNumber is within the valid range (0-7)
  if (iconNumber < 0 || iconNumber > 7 || isNaN(iconNumber)) {
    console.error("Invalid icon number:", iconNumber);
    return null; // Return null or a default icon if the number is invalid
  }

  // Construct the SVG sprite URL or ID
  const iconId = `#icon-${iconNumber}`; // Example: #icon-0, #icon-1, etc.
  return (
    <svg className="project-icon">
      <use href={`/path-to-your-sprite-file.svg${iconId}`} />
    </svg>
  );
}

export default getProjectIcon;
