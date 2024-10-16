// Importing React library for component creation
import React from "react";

// Importing styles for Avatar component
import "./Avatar.css";

// Array of colors for avatar background
const avatarColors = ["green", "blue", "red", "orange", "purple"];

// Array of colors for availability indicator
const availabilityColors = ["#ccc", "#2ecc71"];

// Avatar functional component
const Avatar = ({ initial, id, available = false }) => {
  // Determine the color for the availability indicator
  const availabilityColor = available ? availabilityColors[1] : availabilityColors[0];

  // Rendering Avatar component with dynamic styles
  return (
    <div className="Avatar" style={{ backgroundColor: avatarColors[id % 5], marginRight: "12px" }}>
      <span style={{ fontSize: "12px" }}>{initial}</span>
      <div
        className="Online__indicator"
        style={{ backgroundColor: availabilityColor }}
      ></div>
    </div>
  );
};

// Exporting Avatar component as the default export
export default Avatar;
