import React from "react";
import { Circles } from "react-loader-spinner";
import "./Loading.css"; // Import the external CSS file

const Loading = () => {
  return (
    <div className="loading-container">
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        visible={true}
      />
      <span className="loading-text">QuickSell</span>
    </div>
  );
};

export default Loading;
