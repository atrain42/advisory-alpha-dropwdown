import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useInView } from "framer-motion";

import { Button, ViewButton, ShowDataLength, Navbar } from "./components";

//Icons
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
  const [apiData, setApiData] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  // filter data contains the value that is typed in the input
  const [filterData, setFilterData] = useState("");
  const [viewAllRoles, setViewAllRoles] = useState(false);

  // Use state to determine default/initial name & role for
  // I will be using the first element of the array
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const searchValue = useRef("");

  // dropdown animation intersection observer
  const dropdownRef = useRef(null);
  const isInView = useInView(dropdownRef, { once: false });

  //Fetch data on page load by passing no arguments to useEffect hook
  useEffect(() => {
    axios
      .get("https://advisoryalpha.github.io/skill-assessments/identities.json")
      .then((res) => {
        setApiData(res.data);
        setName(res.data[0].name);
        setRole(res.data[0].role);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  //Create a use effect that autofocuses the search input when the button is clicked
  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const viewRolesHandler = () => {
    setViewAllRoles(!viewAllRoles);
  };

  return (
    <Navbar>
      <div className="container">
        <Button
          name={name}
          setViewAllRoles={setViewAllRoles}
          setDropdown={setDropdown}
          dropdown={dropdown}
        />

        <div
          className={!dropdown ? "dropdown" : "dropdown-unhide"}
          ref={dropdownRef}
        >
          <div className="dropdown-header">
            <h1>{name}</h1>
            <img src={profileImage} alt="profile" id="dropdown-img" />
            <h2>Sarah Johnson</h2>
            <h4>{role}</h4>
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
            <ul className={!viewAllRoles ? "ul-initial" : "ul-final"}>
              <ShowDataLength
                apiData={apiData}
                filterData={filterData}
                setName={setName}
                setRole={setRole}
                viewAllRoles={viewAllRoles}
              />
            </ul>
            <ViewButton
              viewRolesHandler={viewRolesHandler}
              viewAllRoles={viewAllRoles}
            />
          </div>
          {/* Make logout button and copyright info disappear when view all button is clicked */}
          {!viewAllRoles && (
            <div className="dropdown-footer">
              <button
                id="logout-btn"
                style={{
                  transform: isInView ? "none" : "translateY(20px)",
                  opacity: isInView ? 1 : 0,
                  transition: "all 0.3s linear 0.7s",
                }}
                onClick={() => setDropdown(false)}
              >
                Log out
              </button>
              <p id="copyright">&#xA9; Advisory Alpha, 2022</p>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default App;
