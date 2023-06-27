import React from "react";
import "./header.css";
import "../app.jsx";
import { useState } from "preact/hooks";

const Header = ({ setGamemode }) => {
  return (
    <header>
      <div className="main-head">
        <a href="#" onClick={() => setGamemode("lol")}>
          LOL
        </a>
        <a href="#" onClick={() => setGamemode("tft")}>
          TFT
        </a>
        <a href="#">LOL-2V2V2V2</a>
      </div>
    </header>
  );
};

export default Header;
