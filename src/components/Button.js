import React, { useState } from "react";

import iconCaret from "../img/icon-caret.svg";
import profileImage from "../img/robot.jpg";

const Button = ({ name, setViewAllRoles, setDropdown, dropdown }) => {
  const [flipIcon, setFlipIcon] = useState(false);

  const clickHandler = () => {
    setDropdown(!dropdown);
    setViewAllRoles(dropdown);
    setFlipIcon(!flipIcon);
  };

  return (
    <>
      <button onClick={clickHandler} id="main-btn">
        <img src={profileImage} alt="profile" id="profile-img" />
        <span className="btn-text">
          <h1>Sarah Johnson</h1>
          <p>{name}</p>
        </span>
        <img
          src={iconCaret}
          alt="icon"
          id={!flipIcon ? "caret-icon" : "caret-icon__flipped"}
        />
      </button>
    </>
  );
};

export default Button;
