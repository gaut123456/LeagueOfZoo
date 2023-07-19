import React, { useState } from "react";
import "./Header.css";
import "../app.jsx";

const Header = ({ setGamemode }) => {
  const [selectedOption, setSelectedOption] = useState("tft");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setGamemode(option);
  };

  return (
      <header>
        <div className="main-head">
          <button
              onClick={() => handleOptionClick("lol")}
              className={selectedOption === "lol" ? "selected" : ""}
          >
            LOL
          </button>
          <button
              onClick={() => handleOptionClick("tft")}
              className={selectedOption === "tft" ? "selected" : ""}
          >
            TFT
          </button>
          <button
              onClick={() => handleOptionClick("2v2v2v2")}
              className={selectedOption === "2v2v2v2" ? "selected" : ""}
          >
            2V2V2V2
          </button>
        </div>
      </header>
  );
};

export default Header;
