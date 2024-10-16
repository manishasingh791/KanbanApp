import React from "react";
import "./Tag.css";
import { FaCircle } from "react-icons/fa";

const Tag = ({ text }) => {
  return (
    <div className="Tag">
      <FaCircle className="Tag__icon" />
      <span className="Tag__text">{text}</span>
    </div>
  );
};

export default Tag;
