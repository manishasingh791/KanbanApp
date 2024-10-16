import React, { useState } from "react";
import "./Header.css";
import { MdOutlineTune } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import OutsideClickHandler from "react-outside-click-handler";
import { GroupingOptions, OrderingOptions } from "../../constants";

const Header = ({ grouping, setGrouping, ordering, setOrdering }) => {
  const [isDisplayOpen, setDisplayOpen] = useState(false);
  const [isGroupingOpen, setGroupingOpen] = useState(false);
  const [isOrderingOpen, setOrderingOpen] = useState(false);

  const toggleDropdown = (dropdownSetter, otherDropdownSetters) => {
    dropdownSetter((prev) => !prev);
    otherDropdownSetters.forEach((setter) => setter(false));
  };
  
  return (
    <div className="Header">
      <button
        className="Display__button"
        onClick={() => toggleDropdown(setDisplayOpen, [setGroupingOpen, setOrderingOpen])}
      >
        <MdOutlineTune /> <span>Display</span> <IoIosArrowDown />
      </button>

      {isDisplayOpen && (
        <OutsideClickHandler onOutsideClick={() => setDisplayOpen(false)}>
          <div className="DropdownBox one">
            <div style={{ display: "flex", alignItems: "center", gap: "4.50rem" }}>
              <span style={{fontSize:"14px"}}>Grouping</span>
              <button
                className="Display__button"
                onClick={() => toggleDropdown(setGroupingOpen, [setOrderingOpen])}
              >
                {GroupingOptions[grouping]} <IoIosArrowDown />
              </button>
              {isGroupingOpen && (
                <OutsideClickHandler onOutsideClick={() => setGroupingOpen(false)}>
                  <div className="DropdownBox two">
                    {GroupingOptions.map((option, index) => (
                      <button
                        key={index}
                        style={{
                          background: "white",
                          border: "none",
                          padding: "0rem 1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setGrouping(index);
                          localStorage.setItem("grouping", index);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </OutsideClickHandler>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "4.75rem" }}>
              <span style={{fontSize:"14px"}}>Ordering</span>
              <button
                className="Display__button"
                onClick={() => toggleDropdown(setOrderingOpen, [setGroupingOpen])}
              >
                {OrderingOptions[ordering]} <IoIosArrowDown />
              </button>
              {isOrderingOpen && (
                <OutsideClickHandler onOutsideClick={() => setOrderingOpen(false)}>
                  <div className="DropdownBox three">
                    {OrderingOptions.map((option, index) => (
                      <button
                        key={index}
                        style={{
                          background: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setOrdering(index);
                          localStorage.setItem("ordering", index);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </OutsideClickHandler>
              )}
            </div>
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Header;
