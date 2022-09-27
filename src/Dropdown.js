import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

//Icons
import iconCaret from "./img/icon-caret.svg";
import iconCog from "./img/icon-cog.svg";
import iconClick from "./img/icon-clock.svg";
import iconSuitcase from "./img/icon-suitcase.svg";
import iconSearch from "./img/icon-search.svg";

//Images
import profileImage from "./img/robot.jpg";

const icons = [
  {
    icon: iconCog,
  },
  {
    icon: iconClick,
  },
  {
    icon: iconSuitcase,
  },
];

function App() {
  const [role, setRole] = useState([]);
  const [flipIcon, setFlipIcon] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [filterData, setFilterData] = useState("");
  const [viewAllRoles, setViewAllRoles] = useState(false);
  const searchValue = useRef("");
  const trimmedData = role.slice(0, -2);

  // add animation when dropdown menu appears
  const dropdownRef = useRef(null);
  const isInView = useInView(dropdownRef, { once: false });

  //Fetch data on page load by passing no arguments to useEffect hook
  useEffect(() => {
    fetch("https://advisoryalpha.github.io/skill-assessments/identities.json")
      .then((res) => res.json())
      .then((data) => {
        setRole(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //Create a use effect that autofocuses the search input when the button is clicked
  useEffect(() => {
    searchValue.current.focus();
  }, [dropdown]);

  const clickHandler = () => {
    if (!dropdown) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }

    if (!flipIcon) {
      setFlipIcon(true);
    } else {
      setFlipIcon(false);
    }
  };

  const viewAllRolesHandler = () => {
    setViewAllRoles(true);
  };

  const viewLessHandler = () => {
    setViewAllRoles(false);
  };

  // control which button is rendered based on whether or not the view all
  // button has been clicked
  const buttonText = () => {
    if (!viewAllRoles) {
      return (
        <button
          id="view-all__btn"
          style={{ marginTop: "10px", marginBottom: "5px" }}
          onClick={viewAllRolesHandler}
        >
          View all
        </button>
      );
    } else {
      return (
        <button
          id="view-all__btn"
          style={{ marginTop: "10px", marginBottom: "5px" }}
          onClick={viewLessHandler}
        >
          View less
        </button>
      );
    }
  };

  return (
    <div className="container">
      <button onClick={clickHandler} id="main-btn">
        <img src={profileImage} alt="profile" id="profile-img" />
        <span className="btn-text">
          <h1>Sarah Johnson</h1>
          <p>Advisor</p>
        </span>
        <img
          src={iconCaret}
          alt="icon"
          id={!flipIcon ? "caret-icon" : "caret-icon__flipped"}
        />
      </button>

      <div
        className={!dropdown ? "dropdown" : "dropdown-unhide"}
        ref={dropdownRef}
      >
        <div className="dropdown-header">
          <h1>Advisor</h1>
          <img src={profileImage} alt="profile" id="dropdown-img" />
          <h2>Sarah Johnson</h2>
          <h4>Administrator</h4>
          <h5>sarah@advisoryalpha.com</h5>
          <div className="icon-container">
            {icons.map((el, index) => (
              <img key={index} src={el.icon} alt="icon" />
            ))}
          </div>
        </div>
        <div className="dropdown-body">
          <p
            style={{
              transform: isInView ? "none" : "translateX(20px)",
              opacity: isInView ? 1 : 0,
              transition: "all 0.5s ease-in",
            }}
          >
            SWITCH IDENTITIES
          </p>

          <span>
            <img src={iconSearch} alt="icon" />
            <input
              type="text"
              ref={searchValue}
              value={filterData}
              onChange={(e) => setFilterData(e.target.value)}
            ></input>
          </span>
          <ul>
            {!viewAllRoles
              ? trimmedData
                  .filter(
                    (apiData) =>
                      apiData.name.includes(filterData) || filterData === ""
                  )
                  .map((apiData, index) => (
                    <li key={index}>
                      <h4>{apiData.name}</h4>
                      <h5>{apiData.role}</h5>
                    </li>
                  ))
              : role
                  .filter(
                    (apiData) =>
                      apiData.name.includes(filterData) || filterData === ""
                  )
                  .map((apiData, index) => (
                    <li key={index}>
                      <h4>{apiData.name}</h4>
                      <h5>{apiData.role}</h5>
                    </li>
                  ))}
            {buttonText()}
          </ul>
        </div>
        {/* Make logout button and copyright info disappear when view all button is clicked */}
        {!viewAllRoles && (
          <div>
            <button
              id="logout-btn"
              style={{
                transform: isInView ? "none" : "translateY(20px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.3s linear 0.7s",
              }}
            >
              Log out
            </button>
            <p id="copyright">&#xA9; Advisory Alpha, 2022</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
