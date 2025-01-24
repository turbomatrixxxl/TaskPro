import React, { useState } from "react";

const ThemeChanger = () => {
  const [theme, setTheme] = useState(""); // Tema curentă
  const [showOptions, setShowOptions] = useState(false); // Arată sau ascunde opțiunile

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    document.body.style.backgroundColor =
      selectedTheme === "dark"
        ? "#161616"
        : selectedTheme === "light"
        ? "#FCFCFC"
        : "#5255BC"; // Violet
    document.body.style.color = selectedTheme === "dark" ? "#fff" : "#161616"; // Culoarea textului
  };

  const buttonStyles = {
    color: theme === "dark" ? "rgba(255, 255, 255, 0.50)" : "#161616", // Culoarea pentru tema dark
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "color 0.2s",
  };

  const selectedButtonStyles = {
    color: "#BEDBB0", // Culoarea butonului selectat
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "color 0.2s",
  };

  const buttonHoverStyles = {
    color: "#BEDBB0", // Culoarea pe hover
    fontFamily: "Poppins",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.28px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "color 0.2s",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative" }}>
      {/* Butonul principal */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          color: "rgba(0, 0, 0, 0.8)",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "normal",
          letterSpacing: "-0.28px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        Theme
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <path
            d="M4 6.5L8 10.5L12 6.5"
            stroke="black" // Poți modifica în funcție de temă
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Div-ul care conține opțiunile */}
      {showOptions && (
        <div
          style={{
            position: "absolute",
            top: "100%", // Apare sub buton
            left: "50%",
            transform: "translateX(-50%)",
            display: "inline-flex",
            padding: "18px 44px 18px 18px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
            border: "1px solid #BEDBB0",
            background: theme === "dark" ? "#151515" : "#FCFCFC", // Fundalul care depinde de temă
            boxShadow: "0px 4px 16px 0px rgba(17, 17, 17, 0.10)",
            marginTop: "10px",
          }}
        >
          {/* Butoanele pentru temă */}
          {["dark", "light", "violet"].map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => changeTheme(themeOption)}
              style={
                theme === themeOption
                  ? selectedButtonStyles // Stil pentru butonul selectat
                  : buttonStyles // Stil pentru butoanele ne-selectate
              }
              onMouseOver={(e) => (e.target.style.color = "#BEDBB0")}
              onMouseOut={(e) =>
                (e.target.style.color =
                  theme === themeOption
                    ? "#BEDBB0"
                    : theme === "dark"
                    ? "rgba(255, 255, 255, 0.50)"
                    : "#161616")
              }
            >
              {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeChanger;
